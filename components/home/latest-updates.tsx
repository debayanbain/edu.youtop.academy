import React from "react";
import { LuCalendar } from "react-icons/lu";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LATEST_UPDATES } from "@/lib/constants";
import { Button } from "../ui/button";

const LatestUpdates = () => {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="bg-brutal-purple text-white p-4 border-3 border-border flex justify-between items-center rounded-lg"
        style={{ boxShadow: "4px 4px 0px 0px var(--brutal-black)" }}
      >
        <h2 className="font-bold text-xl">Latest Updates</h2>
        <LuCalendar size='27' />
      </div>

      {/* Update Cards */}
      <div className="space-y-4">
        {LATEST_UPDATES.map((update) => (
          <Card key={update.id} className="cursor-pointer group" hoverEffect>
            <div className="flex justify-between items-start mb-2">
              <Badge
                variant={
                  update.type === "Exam"
                    ? "blue"
                    : update.type === "Job"
                      ? "green"
                      : "yellow"
                }
              >
                {update.type}
              </Badge>
              <span className="text-xs font-bold text-muted-foreground">
                {update.date}
              </span>
            </div>
            <h3 className="font-bold text-lg leading-snug group-hover:text-brutal-purple transition-colors">
              {update.title}
            </h3>
          </Card>
        ))}
        <Button className="w-full" variant="purple">
          View All Updates
        </Button>
      </div>

      {/* Promo Card */}
      <div
        className="bg-brutal-dark p-6 text-center text-white border-3 border-border relative overflow-hidden rounded-lg"
        style={{ boxShadow: "6px 6px 0px 0px var(--brutal-black)" }}
      >
        <div className="absolute top-0 right-0 p-2 bg-brutal-yellow text-brutal-dark text-xs font-bold">
          PRO
        </div>
        <h3 className="font-bold text-2xl mb-2 text-brutal-yellow">
          Join Pro Batch
        </h3>
        <p className="mb-4 text-sm text-gray-300">
          Unlock premium notes and live classes.
        </p>
        <button className="btn-brutal btn-brutal-sm w-full">
          Register Now
        </button>
      </div>
    </div>
  );
};

export default LatestUpdates;
