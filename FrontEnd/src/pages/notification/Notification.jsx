// import * as React from "react";
// import { DataGrid } from "@mui/x-data-grid";
// import { GridCellParams } from "@mui/x-data-grid";
// import Button from "@mui/material/Button"; // Import Button component from Material UI

// const columns = [
//   // ... other column definitions
//   {
//     field: "picture",
//     headerName: "",
//     width: 60,
//     renderCell: (params: GridCellParams) => <img src={params.row.picture} />,
//   },
//   { field: "notification", headerName: "status", width: 160 },
//   { field: "date", headerName: "Date", width: 100 },
//   { field: "name", headerName: "Name", width: 200 },
//   {
//     field: "accept",
//     headerName: "",
//     width: 90,
//     renderCell: (params: GridCellParams) => {
//       const isAcceptEmpty = params.row.accept === ""; // Check if accept field is empty

//       return (
//         <Button
//           variant="contained"
//           size="small"
//           disabled={!isAcceptEmpty} // Disable button if accept field is filled
//           onClick={() => {
//             // Handle accept button click logic here, e.g., update row data or trigger an API call
//             console.log("Accept button clicked for row:", params.row);
//           }}
//         >
//           Accept
//         </Button>
//       );
//     },
//   },
//   {
//     field: "decline",
//     headerName: "",
//     width: 90,
//     renderCell: (params: GridCellParams) => {
//       const isDeclineEmpty = params.row.decline === ""; // Check if decline field is empty

//       return (
//         <Button
//           variant="contained"
//           size="small"
//           disabled={!isDeclineEmpty} // Disable button if decline field is filled
//           onClick={() => {
//             // Handle decline button click logic here
//             console.log("Decline button clicked for row:", params.row);
//           }}
//         >
//           Decline
//         </Button>
//       );
//     },
//   },
// ];

// const rows = [
//   {
//     picture: "/mg.jpg",
//     notification: "Request to asses personality",
//     date: "3 feb 2024",
//     name: "Bruce Wayne",
//     id: "215568A",
//     accept: "",
//     decline: "",
//   },
//   // ... other rows
// ];

// function LeadershipTable() {
//   return (
//     <div style={{ height: 550, width: "100%" }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         initialState={{
//           pagination: {
//             paginationModel: { page: 0, pageSize: 10 },
//           },
//         }}
//         pageSizeOptions={[5, 10, 20]}
//       />
//     </div>
//   );
// }
// export default LeadershipTable;



// import React, { useState, useEffect } from 'react';
// import PageLayout from '../layouts/MainLayout';
// import { VscArrowLeft, VscArrowRight } from "react-icons/vsc";
// // import axios from 'axios'; // Make sure to install this package
// import { DataGrid } from "@mui/x-data-grid";
// import Button from "@mui/material/Button";

// const columns = [
//   { field: "picture", headerName: "", width: 60, renderCell: (params) => <img src={params.row.picture} alt="profile" /> },
//   { field: "notification", headerName: "Status", width: 160 },
//   { field: "date", headerName: "Date", width: 100 },
//   { field: "name", headerName: "Name", width: 200 },
//   {
//     field: "accept",
//     headerName: "",
//     width: 90,
//     renderCell: (params) => (
//       <Button
//         variant="contained"
//         size="small"
//         disabled={!params.row.accept}
//         onClick={() => {
//           console.log("Accept button clicked for row:", params.row);
//         }}
//       >
//         Accept
//       </Button>
//     ),
//   },
//   {
//     field: "decline",
//     headerName: "",
//     width: 90,
//     renderCell: (params) => (
//       <Button
//         variant="contained"
//         size="small"
//         disabled={!params.row.decline}
//         onClick={() => {
//           console.log("Decline button clicked for row:", params.row);
//         }}
//       >
//         Decline
//       </Button>
//     ),
//   },
// ];

// function LeadershipTable() {
//   const rows = [
//     { picture: "/mg.jpg", notification: "Request to assess personality", date: "3 Feb 2024", name: "Bruce Wayne", id: "215568A", accept: "", decline: "" },
//     // Add more rows as needed
//   ];

//   return (
//     <div style={{ height: 550, width: "100%" }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         pageSizeOptions={[5, 10, 20]}
//         pagination
//       />
//     </div>
//   );
// }

// const Notification = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handlePrev = () => {
//     setCurrentIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : 0));
//   };

//   const handleNext = () => {
//     // Add logic to handle next button click
//     // setCurrentIndex(prevIndex => (prevIndex < data.length - 1 ? prevIndex + 1 : prevIndex));
//   };

//   const pageContent = (
//     <div className={`flex flex-col h-full p-10`}>
//       <div className="flex justify-between items-center mb-4">
//         <button onClick={handlePrev} className="px-4 py-2 bg-blue-500 text-white rounded-md"><VscArrowLeft /></button>
//         {/* Add the Div1 component here */}
//         <button onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded-md"><VscArrowRight /></button>
//       </div>
//       <LeadershipTable /> {/* Include the LeadershipTable component */}
//     </div>
//   );

//   return (<PageLayout content={pageContent} pagename={"Notification"} />);
// };

// export default Notification;



import React, { useState } from 'react';
import PageLayout from '../layouts/MainLayout';
import { VscArrowLeft, VscArrowRight } from "react-icons/vsc";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import "../style/Notification.css";

const columns = [
  { field: "picture", headerName: "", width: 60, renderCell: (params) => <img src={params.row.picture} alt="profile" /> },
  { field: "notification", headerName: "Status", width: 160 },
  { field: "date", headerName: "Date", width: 100 },
  { field: "name", headerName: "Name", width: 200 },
  {
    field: "accept",
    headerName: "",
    width: 90,
    renderCell: (params) => (
      <Button
        variant="contained"
        size="small"
        disabled={!params.row.accept}
        onClick={() => {
          console.log("Accept button clicked for row:", params.row);
        }}
        className="button accept-button"
      >
        Accept
      </Button>
    ),
  },
  {
    field: "decline",
    headerName: "",
    width: 90,
    renderCell: (params) => (
      <Button
        variant="contained"
        size="small"
        disabled={!params.row.decline}
        onClick={() => {
          console.log("Decline button clicked for row:", params.row);
        }}
        className="button decline-button"
      >
        Decline
      </Button>
    ),
  },
];

function LeadershipTable() {
  const rows = [
    { picture: "/mg.jpg", notification: "Request to assess personality", date: "3 Feb 2024", name: "Bruce Wayne", id: "215568A", accept: "", decline: "" },
    // Add more rows as needed
  ];

  return (
    <div style={{ height: 550, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 20]}
        pagination
      />
    </div>
  );
}

const Notification = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(prevIndex => (prevIndex > 0 ? prevIndex - 1 : 0));
  };

  const handleNext = () => {
    // Add logic to handle next button click
    // setCurrentIndex(prevIndex => (prevIndex < data.length - 1 ? prevIndex + 1 : prevIndex));
  };

  const pageContent = (
    <div className={`flex flex-col h-full p-10`}>
      <div className="flex justify-between items-center mb-4">
        <button onClick={handlePrev} className="px-4 py-2 bg-blue-500 text-white rounded-md"><VscArrowLeft /></button>
        {/* Add the Div1 component here */}
        <button onClick={handleNext} className="px-4 py-2 bg-blue-500 text-white rounded-md"><VscArrowRight /></button>
      </div>
      <LeadershipTable /> {/* Include the LeadershipTable component */}
    </div>
  );

  return (<PageLayout content={pageContent} pagename={"Notification"} />);
};

export default Notification;
