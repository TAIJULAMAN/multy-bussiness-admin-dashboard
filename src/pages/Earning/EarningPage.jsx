import React from "react";
import EarningManage from "./EarningManage";
import BookingChart from "./BookingChart";
import PageHeading from "../../Components/Shared/PageHeading";
import TransactionTable from "./TransactionTable";

function EarningPage() {
 
  return (
    <div>
      <PageHeading title={"Earnings"} />
      <div className="grid md:grid-cols-2  lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <div className="col-span-2">
          <EarningManage />
        </div>
        <div className="col-span-3">
          <BookingChart />
        </div>
      </div>
      <div className="mt-12">
        <h1 className="text-2xl font-bold text-[#0091FF] mb-5 text-start">
          Last transactions history
        </h1>
        <TransactionTable />
      </div>
    </div>
  );
}

export default EarningPage;
