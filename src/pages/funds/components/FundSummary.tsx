import { CalendarMonth } from "@mui/icons-material";
import { Card } from "@mui/material";
import { InfoDisplay } from "../../../components/displays/InfoDisplay";
import { Divider } from "../../../components/dividers/Divider";

export const FundSummary = () => {
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
    <Card style={{ padding: "24px" }}>
      {summaries.map((summary, index) => (
        <>
          <InfoDisplay
            key={index}
            label={summary.displayName}
            details={summary.details}
            EndIconComponent={summary.endIconComponent}
          />
          {summaries.length - 1 !== index && <Divider />}
        </>
      ))}
    </Card>
  );
};
