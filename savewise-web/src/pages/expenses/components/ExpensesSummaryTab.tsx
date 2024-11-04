import { CalendarMonth } from "@mui/icons-material";
import { Card } from "@mui/material";
import { InfoDisplay } from "../../../components/displays/InfoDisplay";
import { Divider } from "../../../components/dividers/Divider";
import React from "react";

export const ExpensesSummaryTab = () => {
  const summaries = [
    { displayName: "Current month total", details: "Php 10,000" },
    {
      displayName: "Previous month total - Sep 2024",
      details: "Php 10,000",
      endIconComponent: <CalendarMonth />,
    },
    { displayName: "Year-to-Date total", details: "Php 10,000" },
    { displayName: "Overall total", details: "Php 10,000" },
  ];

  return (
    <Card style={{ padding: "32px", width: "100%" }}>
      {summaries.map((summary, index) => (
        <React.Fragment key={index}>
          <InfoDisplay
            label={summary.displayName}
            details={summary.details}
            EndIconComponent={summary.endIconComponent}
          />
          {summaries.length - 1 !== index && <Divider />}
        </React.Fragment>
      ))}
    </Card>
  );
};
