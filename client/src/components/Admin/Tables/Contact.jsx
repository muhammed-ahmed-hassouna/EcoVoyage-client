import Swal from "sweetalert2";
import React from "react";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";
import { usePage } from "../../Context/SelectedPageContext";

const Contact = () => {
  const [messages, setMessages] = useState([]);
  const [filteredMsgs, setFilteredMsgs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(1);
  const [isMessageOpened, setIsMessageOpened] = useState(false);
  const [msgIndex, setMsgIndex] = useState(0);
  const itemsPerPage = 10;
  const { headers } = useAuth();
  const { page, onSelectedPage, selectedId, onSelectedId } = usePage();

  const TABLE_HEAD = ["Number", "From", "Subject", ""];
  const fetchData = () => {
    axios
      .get(`http://localhost:3999/getAllContact`)
      .then((response) => {
        setMessages(response.data);
        setFilteredMsgs(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const totalPages = Math.ceil(filteredMsgs.length / itemsPerPage);
  const indexOfLastMessages = currentPage * itemsPerPage;
  const indexOfFirstMessages = indexOfLastMessages - itemsPerPage;
  const currentConatct = filteredMsgs.slice(
    indexOfFirstMessages,
    indexOfLastMessages
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery === "") {
      setFilteredMsgs(messages);
    } else {
      setFilteredMsgs(
        messages.filter(
          (msg) =>
            msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            msg.fullname.toLowerCase().includes(searchQuery.toLowerCase()) ||
            msg.email.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  };

  const openMessage = (id) => {
    setIsMessageOpened(true);
    setMsgIndex(id);
  };

  const closeMessage = () => {
    setIsMessageOpened(false);
  };

  const replyToMsg = () => {};

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0f766e",
      cancelButtonColor: "#be123c",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // axios
        //   .put(`http://localhost:3999/deleteActivities/${id}`, null, {
        //     headers: headers,
        //   })
        //   .then((response) => {
        //       fetchData();
        //       Swal.fire({
        //       title: "Deleted!",
        //       text: "Message has been deleted.",
        //       icon: "success",
        //     });
        //   })
        //   .catch((error) => {
        //     Swal.fire({
        //       icon: "error",
        //       title: "Oops...",
        //       text: "Something went wrong with deleting the message.",
        //       confirmButtonText: "OK",
        //       customClass: {
        //         confirmButton:
        //           "bg-sky-900 hover:bg-second-color text-second-color hover:text-sky-900 border border-sky-900 py-2 px-4 rounded",
        //       },
        //     });
        //   });
      }
    });
  };

  const addToHome = (id) => {
    axios
      .put(`http://localhost:3999/updateContactShownStatus/${id}`, null, {
        headers: headers,
      })
      .then((response) => {
        Swal.fire({
          title: "Success!",
          text: "Message was added successfulyy to home page.",
          icon: "success",
          confirmButtonColor: "#0f766e",
        });
        fetchData();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong with adding the message.",
          confirmButtonText: "OK",
          customClass: {
            confirmButton:
              "bg-sky-900 hover:bg-second-color text-second-color hover:text-sky-900 border border-sky-900 py-2 px-4 rounded",
          },
        });
      });
  };
  const deleteFromHome = (id) => {
    axios
      .put(`http://localhost:3999/updateContactShownStatus/${id}`, null, {
        headers: headers,
      })
      .then((response) => {
        Swal.fire({
          title: "Success!",
          text: "Message was removed from home page.",
          icon: "success",
          confirmButtonColor: "#0f766e",
        });
        fetchData();
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong with removing the message.",
          confirmButtonText: "OK",
          customClass: {
            confirmButton:
              "bg-sky-900 hover:bg-second-color text-second-color hover:text-sky-900 border border-sky-900 py-2 px-4 rounded",
          },
        });
      });
  };

  return (
    <Card className="p-2 lg:ml-80 m-5 w-auto h-full border border-third-color bg-second-color">
      <h1 className="text-Base-color text-start mt-5 mx-5 text-lg font-bold">
        Messages
      </h1>
      <hr className="text-third-color" />
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none mt-0 bg-second-color"
      >
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 m-4">
          {/* search */}
          <form className="w-full lg:w-1/3" onSubmit={(e) => handleSearch(e)}>
            <label
              for="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Flight"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="text-second-color hover:text-fourth-color absolute end-0 bottom-0 bg-fourth-color hover:bg-second-color border border-fourth-color focus:ring-4 focus:outline-none font-medium rounded-r-lg text-sm px-4 py-2"
              >
                Search
              </button>
            </div>
          </form>
          {/* <div className="flex w-full md:w-auto shrink-0 flex-col gap-2 sm:flex-row">
            <Button
              variant="outlined"
              size="sm"
              onClick={() => onSelectedPage("messages")}
            >
              view all
            </Button>
          </div> */}
        </div>
      </CardHeader>
      <CardBody className="px-3 pt-0 h-[450px] overflow-auto">
        <table className="w-full min-w-max table-auto text-left">
          <thead className="bg-third-color text-second-color">
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentConatct.map((message, index) => {
              const isLast =
                (index === filteredMsgs.length) === 0
                  ? messages.length - 1
                  : filteredMsgs.length - 1;
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
                          {index}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {message.fullname}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {message.email}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <div>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {message.subject}
                      </Typography>
                    </div>
                  </td>
                  <td className={`${classes} text-center`}>
                    <Tooltip content="Open Message" className="bg-black/80">
                      <IconButton
                        onClick={() => openMessage(index)}
                        variant="text"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="text-Base-color w-6 h-6 font-bold"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                          />
                        </svg>
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page {currentPage} of {totalPages}
        </Typography>
        <div className="flex gap-2">
          <Button
            onClick={() => currentPage !== 1 && paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="text-sky-900"
            variant="outlined"
            size="sm"
          >
            Previous
          </Button>
          <Button
            onClick={() =>
              currentPage !==
                Math.ceil(
                  filteredMsgs.length === 0
                    ? messages.length / itemsPerPage
                    : filteredMsgs.length / itemsPerPage
                ) && paginate(currentPage + 1)
            }
            disabled={
              currentPage ===
              Math.ceil(
                filteredMsgs.length === 0
                  ? messages.length / itemsPerPage
                  : filteredMsgs.length / itemsPerPage
              )
            }
            className="text-Base-color"
            variant="outlined"
            size="sm"
          >
            Next
          </Button>
        </div>
      </CardFooter>
      {isMessageOpened && (
        <div className="fixed x-[55] top-0 left-0 w-full h-full flex items-center justify-center bg-black/30 bg-opacity-50">
          <div className="bg-second-color p-6 rounded shadow-lg w-full lg:w-2/5 text-black flex flex-col gap-3 justify-center">
            <div className="text-start text-Base-color flex justify-between items-center">
              <h1 className="font-bold">
                {messages[msgIndex].fullname}
                <span className="text-fourth-color/80 font-normal">
                  {" <"}
                  {messages[msgIndex].email}
                  {">"}
                </span>
              </h1>

              <button
                onClick={closeMessage}
                className="p-2 text-third-color hover:text-fourth-color"
                // className="mt-4 ml-3 p-2 px-4 bg-white hover:bg-gray-200 border text-fourth-color border-fourth-color lg:text-lg rounded-lg shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
              </button>
            </div>
            <hr />
            <div className="text-start text-Base-color">
              <h1 className="font-bold">
                subject:{" "}
                <span className="font-normal text-third-color">
                  {messages[msgIndex].subject}
                </span>
              </h1>
            </div>
            <hr />
            <div className="w-full bg-white text-start text-Base-color p-3 h-[230px]">
              {messages[msgIndex].message}
            </div>
            <div className="text-end">
              <Tooltip content="Reply to message" className="z-[60] bg-black/80">
                <IconButton onClick={() => replyToMsg()} variant="text">
                  <svg
                    className="text-third-color w-6 h-6 rotate-[315deg]"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                    />
                  </svg>
                </IconButton>
              </Tooltip>
              {!messages[msgIndex].is_shown ? (
                <Tooltip content="Add message to home page" className="z-[60] bg-black/80">
                  <IconButton
                    onClick={() => addToHome(messages[msgIndex].contact_id)}
                    variant="text"
                  >
                    <svg
                      className="text-third-color w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      {" "}
                      <circle cx="12" cy="12" r="10" />{" "}
                      <line x1="12" y1="8" x2="12" y2="16" />{" "}
                      <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                  </IconButton>
                </Tooltip>
              ) : (
                <Tooltip content="Remove message from home page" className="z-[60] bg-black/80">
                  <IconButton
                    onClick={() =>
                      deleteFromHome(messages[msgIndex].contact_id)
                    }
                    variant="text"
                  >
                    <svg
                      className="text-third-color w-6 h-6"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </IconButton>
                </Tooltip>
              )}
              <Tooltip content="Delete message" className="z-[60] bg-black/80">
                <IconButton
                  onClick={() => handleDelete(messages[msgIndex].contact_id)}
                  variant="text"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    className="text-fourth-color w-6 h-6 font-bold"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                    />
                  </svg>
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};
export default Contact;
