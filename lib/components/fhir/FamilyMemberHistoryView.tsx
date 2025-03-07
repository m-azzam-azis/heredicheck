import React from "react";
import { FamilyMemberHistory } from "fhir/r4";
import { IconHeartFilled, IconUser } from "@tabler/icons-react";

interface GroupedHistory {
  relationship: string;
  relationshipOrder: number;
  conditions: Set<string>; // Using Set to prevent duplicates
}

export interface IFamilyMemberHistoryViewProps {
  familyHistories: FamilyMemberHistory[];
}

export const FamilyMemberHistoryView: React.FC<
  IFamilyMemberHistoryViewProps
> = ({ familyHistories }) => {
  // Define relationship order
  const relationshipOrder: { [key: string]: number } = {
    Father: 1,
    Mother: 2,
    Brother: 3,
    Sister: 3,
    Unknown: 99,
  };

  const getRelationshipOrder = (relationship: string): number => {
    return relationshipOrder[relationship] || 99;
  };

  const groupHistoriesByRelationship = () => {
    const grouped: { [key: string]: GroupedHistory } = {};

    familyHistories.forEach((history) => {
      const relationshipDisplay =
        history.relationship?.coding?.[0]?.display || "Unknown";

      if (!grouped[relationshipDisplay]) {
        grouped[relationshipDisplay] = {
          relationship: relationshipDisplay,
          relationshipOrder: getRelationshipOrder(relationshipDisplay),
          conditions: new Set(),
        };
      }

      // Add conditions to Set (automatically handles duplicates)
      history.condition?.forEach((condition) => {
        const conditionDisplay =
          condition.code?.coding?.[0]?.display ||
          condition.code?.text ||
          "Unknown Condition";
        grouped[relationshipDisplay].conditions.add(conditionDisplay);
      });
    });

    // Convert to array and sort by relationship order
    return Object.values(grouped).sort(
      (a, b) => a.relationshipOrder - b.relationshipOrder
    );
  };

  const groupedHistories = groupHistoriesByRelationship();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {groupedHistories.map((group, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-blue-50 px-4 py-3 border-b border-gray-200 flex items-center gap-2">
            <IconUser className="text-blue-600" size={20} />
            <h3 className="font-medium text-blue-900">{group.relationship}</h3>
          </div>

          {/* Conditions */}
          <div className="p-4">
            <div className="space-y-2">
              {Array.from(group.conditions).map((condition, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-2 bg-gray-50 rounded-md"
                >
                  <IconHeartFilled size={16} className="text-red-500" />
                  <span className="text-gray-700">{condition}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FamilyMemberHistoryView;
