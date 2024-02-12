import React, { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext";
import axios from "axios";
import { CardFooter, Typography } from "@material-tailwind/react";
import { Button } from "flowbite-react";

const FlightsHistory = () => {
  const [bookings, setBookings] = useState([]);
  const { headers } = useAuth();
  const [currentPage, setCurrentPage] = useState(1);
  const options = { day: "numeric", month: "short", year: "numeric" };
  useEffect(() => {
    if (headers) {
      axios
        .get("http://localhost:3999/getFlightsOfUser", { headers: headers })
        .then((response) => {
          if (response.data != "Ticket not found for the user") {
            let newData = response.data.map((data) => {
              const departDate = new Date(data.depart_date).toLocaleDateString(
                "en-US",
                options
              );
              const returnDate = new Date(data.return_date).toLocaleDateString(
                "en-US",
                options
              );
              return {
                ...data,
                depart: departDate,
                return: returnDate,
              };
            });
            newData.reverse();
            setBookings(newData);
          }
        });
    }
  }, [headers]);

  const tableHeader = [
    "id",
    "Destination",
    "Depart Date",
    "Return Date",
    "Ticket Type",
    "Cost",
  ];

  const itemsPerPage = 3;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = bookings.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(bookings.length / itemsPerPage);
  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 3;
    if (totalPages > 2) {
      let start = Math.max(
        1,
        Math.min(currentPage - 1, totalPages - maxPagesToShow + 1)
      );
      const end = Math.min(start + maxPagesToShow - 1, totalPages);
      if (end === totalPages) {
        start = totalPages - 2;
      }
      for (let i = start; i <= end; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => paginate(i)}
            className={`mx-1 px-3 py-1 rounded w-[42px] ${
              i === currentPage
                ? "bg-third-color text-second-color"
                : "text-third-color"
            }`}
          >
            {i}
          </button>
        );
      }
    } else {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(
          <button
            key={i}
            onClick={() => paginate(i)}
            className={`mx-1 px-3 py-1 rounded w-[42px] ${
              i === currentPage
                ? "bg-third-color text-second-color"
                : "text-third-color"
            }`}
          >
            {i}
          </button>
        );
      }
    }
    return pageNumbers;
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col justify-between items-center m-10 mb-5 bg-second-color h-[280px] rounded border border-transparent-third-color">
      <table className="overflow-auto text-start w-full border-0">
        <thead className="w-full min-w-max table-auto text-left">
          <tr className="bg-third-color">
            {tableHeader.map((label, index) => (
              <th key={index} className="border-y border-blue-gray-100 p-4">
                <Typography
                  variant="small"
                  color="white"
                  className="font-normal leading-none"
                >
                  {label}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentBookings &&
            currentBookings.map((booking, index) => {
              const isLast = bookings.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";
              return (
                <tr
                  key={index}
                  className={
                    index % 2 !== 0
                      ? "bg-second-color"
                      : "bg-transparent-first-color"
                  }
                >
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {index + 1}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td>Brazil {/* booking.destination_name */}</td>
                  <td>{booking.depart}</td>
                  <td>{booking.return}</td>
                  <td>
                    {booking.ticket_type == "economy"
                      ? "Economy"
                      : booking.ticket_type == "business"
                      ? "Business"
                      : "First"}
                  </td>
                  <td>{booking.cost}JOD</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <CardFooter className="flex items-center justify-center border-t border-blue-gray-50 p-4 w-full">
        <Typography variant="small" color="blue-gray" className="font-normal">
          {/* Page {currentPage} of {totalPages} */}
        </Typography>
        <div className="flex gap-2">
          <Button
            onClick={() => currentPage !== 1 && setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-Base-color hover:bg-transparent-first-color"
            variant="outlined"
            size="sm"
          >
            Previous
          </Button>
          <div>{renderPageNumbers()}</div>
          <Button
            onClick={() =>
              currentPage != totalPages && setCurrentPage(currentPage + 1)
            }
            disabled={currentPage == totalPages}
            className="text-Base-color hover:bg-transparent-first-color"
            variant="outlined"
            size="sm"
          >
            Next
          </Button>
        </div>
      </CardFooter>
    </div>
  );
};

export default FlightsHistory;
