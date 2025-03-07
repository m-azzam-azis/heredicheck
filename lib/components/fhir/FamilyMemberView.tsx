import React from "react";
import { RelatedPerson } from "fhir/r4";
import { FamilyMemberHistory } from "fhir/r4";
import CodeableConceptView from "./CodeableConceptView";
import DateView from "./DateView";
import HumanNameView from "./HumanNameView";
import AddressView from "./AddressView";

export interface IFamilyMemberHistoryProps {
  relatedPerson?: RelatedPerson;
}

export const FamilyMemberHistoryView: React.FC<IFamilyMemberHistoryProps> = (
  props
) => {
  if (!props.relatedPerson) {
    return null;
  }

  const { relatedPerson } = props;

  return (
    <div className="p-4 border border-gray-200 rounded-lg mb-4">
      {relatedPerson.name && relatedPerson.name.length > 0 && (
        <div className="text-xl mb-4">
          <HumanNameView humanName={relatedPerson.name[0]} />
        </div>
      )}

      {relatedPerson.relationship && relatedPerson.relationship.length > 0 && (
        <div className="mb-2">
          <span className="font-semibold mr-2">Relationship:</span>
          <CodeableConceptView
            codeableConcept={relatedPerson.relationship[0]}
          />
        </div>
      )}

      {relatedPerson.gender && (
        <div className="mb-2">
          <span className="font-semibold mr-2">Gender:</span>
          <span className="capitalize">{relatedPerson.gender}</span>
        </div>
      )}

      {relatedPerson.birthDate && (
        <div className="mb-2">
          <span className="font-semibold mr-2">Birth Date:</span>
          <DateView date={relatedPerson.birthDate} />
        </div>
      )}

      {relatedPerson.telecom && relatedPerson.telecom.length > 0 && (
        <div className="mb-2">
          <span className="font-semibold mr-2">Contact:</span>
          <div className="ml-4 space-y-1">
            {relatedPerson.telecom.map((contact, index) => (
              <div key={index} className="flex items-center gap-2">
                <span className="capitalize text-gray-600">
                  {contact.system}:
                </span>
                <a
                  href={`${contact.system === "email" ? "mailto:" : "tel:"}${
                    contact.value
                  }`}
                  className="text-blue-600 hover:underline"
                >
                  {contact.value}
                </a>
                {contact.use && (
                  <span className="text-sm text-gray-500">({contact.use})</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {relatedPerson.address && relatedPerson.address.length > 0 && (
        <div className="mb-2">
          <span className="font-semibold mr-2">Address:</span>
          <AddressView address={relatedPerson.address[0]} />
        </div>
      )}

      {relatedPerson.active !== undefined && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <span className="font-semibold mr-2">Status:</span>
          <span
            className={relatedPerson.active ? "text-green-600" : "text-red-600"}
          >
            {relatedPerson.active ? "Active" : "Inactive"}
          </span>
        </div>
      )}
    </div>
  );
};

export default FamilyMemberHistoryView;
