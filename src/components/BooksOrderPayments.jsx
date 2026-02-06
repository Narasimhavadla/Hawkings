import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";

export default function BookOrderPayments() {
  const api = import.meta.env.VITE_API_BASE_URL;
  const domainApi = import.meta.env.VITE_API_DOMAIN;
  const token = localStorage.getItem("token")

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [editingId, setEditingId] =
    useState(null);
  const [statusValue, setStatusValue] =
    useState("");

  const [deleteId, setDeleteId] =
    useState(null);
  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  /* FILTER STATES */
  const [statusFilter, setStatusFilter] =
    useState("All");
  const [dateFilter, setDateFilter] =
    useState("All");
  const [customDate, setCustomDate] =
    useState("");

  /* PAGINATION STATES */
  const [currentPage, setCurrentPage] =
    useState(1);
  const recordsPerPage = 10;

  /* ---------------- FETCH ORDERS ---------------- */
  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        `${api}/orders/admin/all`,{
          headers : {
            Authorization : `Bearer ${token}`
          }
        }
      );
      setOrders(data.orders);
    } catch (err) {
      console.error(err);
      alert("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* ---------------- DATE FILTER ---------------- */
  const checkDateFilter = (date) => {
    const orderDate = new Date(date);
    const today = new Date();

    if (dateFilter === "Today") {
      return (
        orderDate.toDateString() ===
        today.toDateString()
      );
    }

    if (dateFilter === "Yesterday") {
      const y = new Date();
      y.setDate(today.getDate() - 1);
      return (
        orderDate.toDateString() ===
        y.toDateString()
      );
    }

    if (dateFilter === "Last7Days") {
      const last7 = new Date();
      last7.setDate(today.getDate() - 7);
      return orderDate >= last7;
    }

    if (dateFilter === "Custom" && customDate) {
      return (
        orderDate.toDateString() ===
        new Date(customDate).toDateString()
      );
    }

    return true;
  };

  /* ---------------- FILTER ---------------- */
  const filteredOrders = useMemo(() => {
    return orders
      .filter((o) =>
        o.fullName
          .toLowerCase()
          .includes(search.toLowerCase())
      )
      .filter((o) =>
        statusFilter === "All"
          ? true
          : o.orderStatus === statusFilter
      )
      .filter((o) =>
        checkDateFilter(o.createdAt)
      );
  }, [
    orders,
    search,
    statusFilter,
    dateFilter,
    customDate,
  ]);

  /* ---------------- PAGINATION ---------------- */
  const indexOfLastRecord =
    currentPage * recordsPerPage;

  const indexOfFirstRecord =
    indexOfLastRecord - recordsPerPage;

  const currentRecords =
    filteredOrders.slice(
      indexOfFirstRecord,
      indexOfLastRecord
    );

  const totalPages = Math.ceil(
    filteredOrders.length /
      recordsPerPage
  );

  /* ---------------- REVENUE ---------------- */
  const totalRevenue = useMemo(() => {
    const now = new Date();
    const currentMonth =
      now.getMonth();
    const currentYear =
      now.getFullYear();

    return filteredOrders
      .filter((o) => {
        if (o.paymentStatus !== "Paid")
          return false;

        const orderDate = new Date(
          o.createdAt
        );

        return (
          orderDate.getMonth() ===
            currentMonth &&
          orderDate.getFullYear() ===
            currentYear
        );
      })
      .reduce(
        (sum, o) =>
          sum + Number(o.totalPrice),
        0
      );
  }, [filteredOrders]);

  /* ---------------- BADGES ---------------- */
  const paymentBadge = (status) => {
    if (status === "Paid")
      return "bg-green-100 text-green-700";
    if (status === "Failed")
      return "bg-red-100 text-red-700";
    return "bg-yellow-100 text-yellow-700";
  };

  const orderBadge = (status) => {
    if (status === "Placed")
      return "bg-blue-100 text-blue-700";
    if (status === "ordered")
      return "bg-orange-100 text-orange-700";
    if (status === "Shipped")
      return "bg-purple-100 text-purple-700";
    if (status === "Delivered")
      return "bg-green-100 text-green-700";
    return "bg-gray-100 text-gray-700";
  };

  /* ---------------- UPDATE STATUS ---------------- */
  const updateStatus = async (
    id,
    status
  ) => {
    try {
      await axios.put(
        `${api}/orders/${id}`,
        { orderStatus: status },
        {
          headers : {
            Authorization : `Bearer ${token}`
          }
        }
      );

      setOrders((prev) =>
        prev.map((o) =>
          o.id === id
            ? {
                ...o,
                orderStatus: status,
              }
            : o
        )
      );

      toast.success(
        "Status changed"
      );
      setEditingId(null);
    } catch (err) {
      console.error(err);
      alert(
        "Failed to update status"
      );
    }
  };

  /* ---------------- DELETE ---------------- */
  const deleteOrder = async () => {
    try {
      await axios.delete(
        `${api}/orders/${deleteId}`,{
          headers : {
            Authorization : `Bearer ${token}`
          }
          
        }
      );

      setOrders((prev) =>
        prev.filter(
          (o) => o.id !== deleteId
        )
      );

      setShowDeleteModal(false);
      setDeleteId(null);

      toast.success(
        "Deleted Successfully"
      );
    } catch (err) {
      console.error(err);
      alert(
        "Failed to delete order"
      );
    }
  };

  /* ---------------- EXPORT EXCEL ---------------- */
  const exportToExcel = () => {
    const data = filteredOrders.map(
      (o) => ({
        Book:
          o.Book?.bookName,
        Customer: o.fullName,
        Phone: o.phone,
        Email: o.email,
        City: o.city,
        State: o.state,
        Quantity: o.quantity,
        Amount: o.totalPrice,
        PaymentStatus:
          o.paymentStatus,
        OrderStatus:
          o.orderStatus,
        PaymentID:
          o.razorpayPaymentId,
        Date: new Date(
          o.createdAt
        ).toLocaleString(),
      })
    );

    const worksheet =
      XLSX.utils.json_to_sheet(
        data
      );
    const workbook =
      XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      "Orders"
    );

    XLSX.writeFile(
      workbook,
      "Book_Orders.xlsx"
    );
  };

  /* ================= UI ================= */

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">
          Book Orders & Payments
        </h1>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search customer..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="border px-4 py-2 rounded-lg"
          />

          <button
            onClick={
              exportToExcel
            }
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Export Excel
          </button>
        </div>
      </div>

      {/* REVENUE + FILTERS */}
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <div className="bg-indigo-600 text-white rounded-xl p-4 px-8 shadow w-fit">
          <p className="text-sm">
            Total Revenue
          </p>
          <h2 className="text-2xl font-bold">
            ₹{totalRevenue}
          </h2>
          <h1>
            in this month only
          </h1>
        </div>

        <div className="flex flex-wrap gap-3">
          <select
            value={
              statusFilter
            }
            onChange={(e) =>
              setStatusFilter(
                e.target.value
              )
            }
            className="border px-4 py-2 rounded-lg"
          >
            <option value="All">
              All Status
            </option>
            <option value="ordered">
              Ordered
            </option>
            <option value="Placed">
              Placed
            </option>
            <option value="Shipped">
              Shipped
            </option>
            <option value="Delivered">
              Delivered
            </option>
          </select>

          <select
            value={dateFilter}
            onChange={(e) =>
              setDateFilter(
                e.target.value
              )
            }
            className="border px-4 py-2 rounded-lg"
          >
            <option value="All">
              All Dates
            </option>
            <option value="Today">
              Today
            </option>
            <option value="Yesterday">
              Yesterday
            </option>
            <option value="Last7Days">
              Last 7 Days
            </option>
            <option value="Custom">
              Custom Date
            </option>
          </select>

          {dateFilter ===
            "Custom" && (
            <input
              type="date"
              value={
                customDate
              }
              onChange={(e) =>
                setCustomDate(
                  e.target.value
                )
              }
              className="border px-4 py-2 rounded-lg"
            />
          )}
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        {loading ? (
          <p className="p-6 text-center">
            Loading orders...
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="p-3">
                  Book
                </th>
                <th className="p-3">
                  Customer
                </th>
                <th className="p-3">
                  Contact
                </th>
                <th className="p-3">
                  Address
                </th>
                <th className="p-3">
                  Qty
                </th>
                <th className="p-3">
                  Amount
                </th>
                <th className="p-3">
                  Payment
                </th>
                <th className="p-3">
                  Order
                </th>
                <th className="p-3">
                  Payment ID
                </th>
                <th className="p-3">
                  Date
                </th>
                <th className="p-3">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {currentRecords.map(
                (o) => (
                  <tr
                    key={o.id}
                    className="border-t hover:bg-gray-50"
                  >
                    <td className="p-3">
                      {
                        o.Book
                          ?.bookName
                      }
                    </td>

                    <td className="p-3 font-medium">
                      {
                        o.fullName
                      }
                    </td>

                    <td className="p-3">
                      <p>
                        {o.phone}
                      </p>
                      <p className="text-xs text-gray-500">
                        {
                          o.email
                        }
                      </p>
                    </td>

                    <td className="p-3 text-xs">
                      {o.address},{" "}
                      {o.city},{" "}
                      {o.state} -{" "}
                      {
                        o.pincode
                      }
                    </td>

                    <td className="p-3">
                      {
                        o.quantity
                      }
                    </td>

                    <td className="p-3 font-semibold">
                      ₹
                      {
                        o.totalPrice
                      }
                    </td>

                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${paymentBadge(
                          o.paymentStatus
                        )}`}
                      >
                        {
                          o.paymentStatus
                        }
                      </span>
                    </td>

                    <td className="p-3">
                      {editingId ===
                      o.id ? (
                        <select
                          value={
                            statusValue
                          }
                          onChange={(
                            e
                          ) => {
                            setStatusValue(
                              e
                                .target
                                .value
                            );
                            updateStatus(
                              o.id,
                              e
                                .target
                                .value
                            );
                          }}
                          className="border rounded px-2 py-1 text-xs"
                          autoFocus
                        >
                          <option value="">
                            Select
                          </option>
                          <option value="Placed">
                            Placed
                          </option>
                          <option value="Shipped">
                            Shipped
                          </option>
                          <option value="Delivered">
                            Delivered
                          </option>
                        </select>
                      ) : (
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${orderBadge(
                            o.orderStatus
                          )}`}
                        >
                          {
                            o.orderStatus
                          }
                        </span>
                      )}
                    </td>

                    <td className="p-3 text-xs">
                      {
                        o.razorpayPaymentId
                      }
                    </td>

                    <td className="p-3 text-xs">
                      {new Date(
                        o.createdAt
                      ).toLocaleString()}
                    </td>

                    <td className="p-2 flex gap-2">
                      <button
                        onClick={() => {
                          setEditingId(
                            o.id
                          );
                          setStatusValue(
                            o.orderStatus
                          );
                        }}
                      >
                        <FontAwesomeIcon
                          icon={
                            faPen
                          }
                          className="text-purple-800"
                        />
                      </button>

                      <button
                        onClick={() => {
                          setDeleteId(
                            o.id
                          );
                          setShowDeleteModal(
                            true
                          );
                        }}
                      >
                        <FontAwesomeIcon
                          icon={
                            faTrash
                          }
                          className="text-red-500"
                        />
                      </button>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-end items-center gap-2 mt-4">
        <button
          disabled={
            currentPage === 1
          }
          onClick={() =>
            setCurrentPage(
              (p) => p - 1
            )
          }
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-sm">
          Page {currentPage} of{" "}
          {totalPages || 1}
        </span>

        <button
          disabled={
            currentPage ===
            totalPages
          }
          onClick={() =>
            setCurrentPage(
              (p) => p + 1
            )
          }
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-[350px]">
            <h2 className="text-lg font-semibold mb-3">
              Delete Order
            </h2>

            <p className="text-sm text-gray-600 mb-6">
              Are you sure you want
              to delete this order?
              This action cannot be
              undone.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteModal(
                    false
                  );
                  setDeleteId(
                    null
                  );
                }}
                className="px-4 py-2 rounded-lg border"
              >
                Cancel
              </button>

              <button
                onClick={
                  deleteOrder
                }
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
