import React, { useState, useEffect } from "react";
import { UsersTable } from "./Tables/UsersTable";
import { usePage } from "../Context/SelectedPageContext";
import Statstics from "./Statstics";
import { DestinationsTable } from "./Tables/DestinationsTable";
import { ActivitiesTable } from "./Tables/ActivitiesTable";
import ProductsStatistics from "./ProductsStatistics";
import { PackagesTable } from "./Tables/PackagesTable";
import FlightsTable from "./Tables/FlightsTable";
import HousingTable from "./Tables/HousingTable";
import ContactTable from "./Tables/ContactTable";

const Dashboard = () => {
  const { page, onSelectedPage } = usePage();
  window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="min-h-screen">
      <div className="lg:ml-80">
        <Statstics />
      </div>
      <div>
        <UsersTable onSelectedPage={onSelectedPage} />
      </div>
      <div>
        <ProductsStatistics />
      </div>
      <div className="flex justify-center items-center m-5 lg:ml-80 gap-5 flex-col lg:flex-row">
        <DestinationsTable />
        <ActivitiesTable />
      </div>
      <div>
        <PackagesTable />
      </div>
      <div>
        <FlightsTable />
      </div>
      <div className="flex justify-center items-center m-5 lg:ml-80 gap-5 flex-col lg:flex-row">
        <div className="w-full lg:w-1/3">
          <ContactTable />
        </div>
        <div className="w-full lg:w-2/3">
          <HousingTable />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
