"use client";
// pages/assessment.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

// TypeScript interfaces
interface Condition {
  name: string;
}

interface Sibling {
  type: "brother" | "sister";
  conditions: string[];
}

interface AssessmentResult {
  self: string[];
  mother: string[];
  father: string[];
  brothers: string[];
  sisters: string[];
}

const commonConditions: string[] = [
  "Diabetes",
  "Hypertension",
  "Heart Disease",
  "Cancer",
  "Asthma",
  "Allergies",
  "Arthritis",
  "Depression",
  "Anxiety",
  "None of the above",
];

export default function Assessment() {
  // Form steps
  const [currentStep, setCurrentStep] = useState<number>(1);
  const totalSteps = 3;

  // User conditions state
  const [userConditions, setUserConditions] = useState<string[]>([]);
  const [newUserCondition, setNewUserCondition] = useState<string>("");

  // Parent conditions state
  const [motherConditions, setMotherConditions] = useState<string[]>([]);
  const [fatherConditions, setFatherConditions] = useState<string[]>([]);
  const [newParentCondition, setNewParentCondition] = useState<string>("");

  // Siblings state
  const [siblings, setSiblings] = useState<Sibling[]>([]);
  const [newSibling, setNewSibling] = useState<Sibling>({
    type: "brother",
    conditions: [],
  });
  const [isAddingSibling, setIsAddingSibling] = useState<boolean>(false);

  // Form submission state
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [assessmentResult, setAssessmentResult] =
    useState<AssessmentResult | null>(null);

  // Handle user conditions
  const handleUserConditionAdd = () => {
    if (newUserCondition && !userConditions.includes(newUserCondition)) {
      setUserConditions([...userConditions, newUserCondition]);
      setNewUserCondition("");
    }
  };

  const handleUserConditionSelect = (condition: string) => {
    if (
      !userConditions.includes(condition) &&
      condition !== "None of the above"
    ) {
      setUserConditions([...userConditions, condition]);
    } else if (condition === "None of the above") {
      setUserConditions([]);
    }
  };

  const handleUserConditionRemove = (condition: string) => {
    setUserConditions(userConditions.filter((c) => c !== condition));
  };

  // Handle parent conditions
  const handleParentConditionAdd = (parent: "mother" | "father") => {
    if (newParentCondition) {
      if (
        parent === "mother" &&
        !motherConditions.includes(newParentCondition)
      ) {
        setMotherConditions([...motherConditions, newParentCondition]);
      } else if (
        parent === "father" &&
        !fatherConditions.includes(newParentCondition)
      ) {
        setFatherConditions([...fatherConditions, newParentCondition]);
      }
      setNewParentCondition("");
    }
  };

  const handleParentConditionSelect = (
    condition: string,
    parent: "mother" | "father"
  ) => {
    if (parent === "mother") {
      if (
        !motherConditions.includes(condition) &&
        condition !== "None of the above"
      ) {
        setMotherConditions([...motherConditions, condition]);
      } else if (condition === "None of the above") {
        setMotherConditions([]);
      }
    } else if (parent === "father") {
      if (
        !fatherConditions.includes(condition) &&
        condition !== "None of the above"
      ) {
        setFatherConditions([...fatherConditions, condition]);
      } else if (condition === "None of the above") {
        setFatherConditions([]);
      }
    }
  };

  const handleParentConditionRemove = (
    condition: string,
    parent: "mother" | "father"
  ) => {
    if (parent === "mother") {
      setMotherConditions(motherConditions.filter((c) => c !== condition));
    } else if (parent === "father") {
      setFatherConditions(fatherConditions.filter((c) => c !== condition));
    }
  };

  // Handle sibling operations
  const handleNewSiblingChange = (field: keyof Sibling, value: any) => {
    setNewSibling({ ...newSibling, [field]: value });
  };

  const handleNewSiblingConditionSelect = (condition: string) => {
    if (
      !newSibling.conditions.includes(condition) &&
      condition !== "None of the above"
    ) {
      handleNewSiblingChange("conditions", [
        ...newSibling.conditions,
        condition,
      ]);
    } else if (condition === "None of the above") {
      handleNewSiblingChange("conditions", []);
    }
  };

  const handleNewSiblingConditionRemove = (condition: string) => {
    handleNewSiblingChange(
      "conditions",
      newSibling.conditions.filter((c) => c !== condition)
    );
  };

  const handleAddSibling = () => {
    if (newSibling.type) {
      setSiblings([...siblings, { ...newSibling }]);
      setNewSibling({
        type: "brother",
        conditions: [],
      });
      setIsAddingSibling(false);
    }
  };

  const handleRemoveSibling = (index: number) => {
    setSiblings(siblings.filter((_, i) => i !== index));
  };

  // Navigation
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Form submission
  const handleSubmit = () => {
    // Combine conditions for brothers and sisters
    const brothersConditions: string[] = [];
    const sistersConditions: string[] = [];

    siblings.forEach((sibling) => {
      if (sibling.type === "brother") {
        sibling.conditions.forEach((condition) => {
          if (!brothersConditions.includes(condition)) {
            brothersConditions.push(condition);
          }
        });
      } else if (sibling.type === "sister") {
        sibling.conditions.forEach((condition) => {
          if (!sistersConditions.includes(condition)) {
            sistersConditions.push(condition);
          }
        });
      }
    });

    const result: AssessmentResult = {
      self: userConditions,
      mother: motherConditions,
      father: fatherConditions,
      brothers: brothersConditions,
      sisters: sistersConditions,
    };

    setAssessmentResult(result);
    setIsSubmitted(true);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  // Progress calculation
  const progressValue = (currentStep / totalSteps) * 100;

  if (isSubmitted && assessmentResult) {
    return (
      <div className="container mx-auto py-10 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-green-600 border-t-4">
            <CardHeader className="bg-green-50 rounded-t-lg">
              <CardTitle className="text-2xl text-center text-green-800">
                Health Assessment Submitted
              </CardTitle>
              <CardDescription className="text-center">
                Thank you for completing your health assessment
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <h3 className="font-medium text-lg text-green-700">
                Assessment Results
              </h3>

              <div className="space-y-4">
                <div className="border-b pb-3">
                  <h4 className="font-medium mb-2 text-green-700">
                    Your Conditions
                  </h4>
                  {assessmentResult.self.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {assessmentResult.self.map((condition) => (
                        <Badge
                          key={condition}
                          className="bg-green-100 text-green-800 hover:bg-green-200"
                        >
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">None reported</p>
                  )}
                </div>

                <div className="border-b pb-3">
                  <h4 className="font-medium mb-2 text-green-700">
                    Mother's Conditions
                  </h4>
                  {assessmentResult.mother.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {assessmentResult.mother.map((condition) => (
                        <Badge
                          key={condition}
                          className="bg-green-100 text-green-800 hover:bg-green-200"
                        >
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">None reported</p>
                  )}
                </div>

                <div className="border-b pb-3">
                  <h4 className="font-medium mb-2 text-green-700">
                    Father's Conditions
                  </h4>
                  {assessmentResult.father.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {assessmentResult.father.map((condition) => (
                        <Badge
                          key={condition}
                          className="bg-green-100 text-green-800 hover:bg-green-200"
                        >
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">None reported</p>
                  )}
                </div>

                <div className="border-b pb-3">
                  <h4 className="font-medium mb-2 text-green-700">
                    Brothers' Conditions (Combined)
                  </h4>
                  {assessmentResult.brothers.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {assessmentResult.brothers.map((condition) => (
                        <Badge
                          key={condition}
                          className="bg-green-100 text-green-800 hover:bg-green-200"
                        >
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">None reported</p>
                  )}
                </div>

                <div>
                  <h4 className="font-medium mb-2 text-green-700">
                    Sisters' Conditions (Combined)
                  </h4>
                  {assessmentResult.sisters.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {assessmentResult.sisters.map((condition) => (
                        <Badge
                          key={condition}
                          className="bg-green-100 text-green-800 hover:bg-green-200"
                        >
                          {condition}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">None reported</p>
                  )}
                </div>
              </div>

              <div className="flex justify-center mt-4">
                <Button
                  onClick={() => setIsSubmitted(false)}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Return to Assessment
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 max-w-4xl">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        <motion.div variants={itemVariants}>
          <Card className="border-green-600 border-t-4">
            <CardHeader className="bg-green-50 rounded-t-lg">
              <CardTitle className="text-2xl text-green-800">
                Health Assessment Form
              </CardTitle>
              <CardDescription>
                Please provide information about your medical conditions and
                family history
              </CardDescription>
              <div className="pt-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>
                    Step {currentStep} of {totalSteps}
                  </span>
                  <span>{Math.round(progressValue)}% Complete</span>
                </div>
                <Progress
                  value={progressValue}
                  className="h-2 bg-green-100"
                  indicatorClassName="bg-green-600"
                />
              </div>
            </CardHeader>

            <CardContent className="p-6">
              {currentStep === 1 && (
                <motion.div
                  variants={itemVariants}
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-green-700">
                      Your Medical Conditions
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {commonConditions.map((condition) => (
                        <div
                          key={condition}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`user-${condition}`}
                            checked={
                              condition === "None of the above"
                                ? userConditions.length === 0
                                : userConditions.includes(condition)
                            }
                            onCheckedChange={() =>
                              handleUserConditionSelect(condition)
                            }
                            className="border-green-500 text-green-600"
                          />
                          <Label htmlFor={`user-${condition}`}>
                            {condition}
                          </Label>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4">
                      <Label htmlFor="newUserCondition">
                        Add another condition
                      </Label>
                      <div className="flex mt-1 space-x-2">
                        <Input
                          id="newUserCondition"
                          value={newUserCondition}
                          onChange={(e) => setNewUserCondition(e.target.value)}
                          placeholder="Enter condition"
                          className="border-green-200 focus:border-green-500 focus:ring-green-500"
                        />
                        <Button
                          onClick={handleUserConditionAdd}
                          disabled={!newUserCondition}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          Add
                        </Button>
                      </div>
                    </div>

                    {userConditions.length > 0 && (
                      <div className="mt-4">
                        <Label>Your selected conditions:</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {userConditions.map((condition) => (
                            <Badge
                              key={condition}
                              className="bg-green-100 text-green-800 hover:bg-green-200 flex items-center gap-1"
                            >
                              {condition}
                              <button
                                className="ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center hover:bg-green-200"
                                onClick={() =>
                                  handleUserConditionRemove(condition)
                                }
                              >
                                ✕
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  variants={itemVariants}
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Mother's Conditions */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-green-700">
                      Mother's Medical Conditions
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {commonConditions.map((condition) => (
                        <div
                          key={condition}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`mother-${condition}`}
                            checked={
                              condition === "None of the above"
                                ? motherConditions.length === 0
                                : motherConditions.includes(condition)
                            }
                            onCheckedChange={() =>
                              handleParentConditionSelect(condition, "mother")
                            }
                            className="border-green-500 text-green-600"
                          />
                          <Label htmlFor={`mother-${condition}`}>
                            {condition}
                          </Label>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4">
                      <Label htmlFor="newMotherCondition">
                        Add another condition
                      </Label>
                      <div className="flex mt-1 space-x-2">
                        <Input
                          id="newMotherCondition"
                          value={newParentCondition}
                          onChange={(e) =>
                            setNewParentCondition(e.target.value)
                          }
                          placeholder="Enter condition"
                          className="border-green-200 focus:border-green-500 focus:ring-green-500"
                        />
                        <Button
                          onClick={() => handleParentConditionAdd("mother")}
                          disabled={!newParentCondition}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          Add
                        </Button>
                      </div>
                    </div>

                    {motherConditions.length > 0 && (
                      <div className="mt-4">
                        <Label>Mother's selected conditions:</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {motherConditions.map((condition) => (
                            <Badge
                              key={condition}
                              className="bg-green-100 text-green-800 hover:bg-green-200 flex items-center gap-1"
                            >
                              {condition}
                              <button
                                className="ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center hover:bg-green-200"
                                onClick={() =>
                                  handleParentConditionRemove(
                                    condition,
                                    "mother"
                                  )
                                }
                              >
                                ✕
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Father's Conditions */}
                  <div className="space-y-4 pt-6 border-t">
                    <h3 className="text-lg font-medium text-green-700">
                      Father's Medical Conditions
                    </h3>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {commonConditions.map((condition) => (
                        <div
                          key={condition}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`father-${condition}`}
                            checked={
                              condition === "None of the above"
                                ? fatherConditions.length === 0
                                : fatherConditions.includes(condition)
                            }
                            onCheckedChange={() =>
                              handleParentConditionSelect(condition, "father")
                            }
                            className="border-green-500 text-green-600"
                          />
                          <Label htmlFor={`father-${condition}`}>
                            {condition}
                          </Label>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4">
                      <Label htmlFor="newFatherCondition">
                        Add another condition
                      </Label>
                      <div className="flex mt-1 space-x-2">
                        <Input
                          id="newFatherCondition"
                          value={newParentCondition}
                          onChange={(e) =>
                            setNewParentCondition(e.target.value)
                          }
                          placeholder="Enter condition"
                          className="border-green-200 focus:border-green-500 focus:ring-green-500"
                        />
                        <Button
                          onClick={() => handleParentConditionAdd("father")}
                          disabled={!newParentCondition}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          Add
                        </Button>
                      </div>
                    </div>

                    {fatherConditions.length > 0 && (
                      <div className="mt-4">
                        <Label>Father's selected conditions:</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {fatherConditions.map((condition) => (
                            <Badge
                              key={condition}
                              className="bg-green-100 text-green-800 hover:bg-green-200 flex items-center gap-1"
                            >
                              {condition}
                              <button
                                className="ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center hover:bg-green-200"
                                onClick={() =>
                                  handleParentConditionRemove(
                                    condition,
                                    "father"
                                  )
                                }
                              >
                                ✕
                              </button>
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  variants={itemVariants}
                  className="space-y-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-green-700">
                      Siblings Information
                    </h3>

                    {/* Existing siblings list */}
                    {siblings.length > 0 && (
                      <div className="space-y-4 mb-6">
                        <Label>Your siblings:</Label>
                        {siblings.map((sibling, index) => (
                          <Card
                            key={index}
                            className="relative border-green-200"
                          >
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base text-green-800">
                                {sibling.type === "brother"
                                  ? "Brother"
                                  : "Sister"}
                              </CardTitle>
                              <Button
                                variant="outline"
                                size="sm"
                                className="absolute top-2 right-2 border-green-200 text-green-700 hover:bg-green-50"
                                onClick={() => handleRemoveSibling(index)}
                              >
                                Remove
                              </Button>
                            </CardHeader>
                            <CardContent>
                              {sibling.conditions.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                  {sibling.conditions.map((condition) => (
                                    <Badge
                                      key={condition}
                                      className="bg-green-100 text-green-800 hover:bg-green-200"
                                    >
                                      {condition}
                                    </Badge>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-gray-500 italic">
                                  No medical conditions
                                </p>
                              )}
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}

                    {/* Add new sibling button */}
                    {!isAddingSibling && (
                      <Button
                        onClick={() => setIsAddingSibling(true)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                      >
                        Add Sibling
                      </Button>
                    )}

                    {/* Add new sibling form */}
                    {isAddingSibling && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4 border border-green-200 p-4 rounded-md bg-green-50"
                      >
                        <div className="space-y-2">
                          <Label htmlFor="siblingType">Sibling Type</Label>
                          <Select
                            value={newSibling.type}
                            onValueChange={(value: "brother" | "sister") =>
                              handleNewSiblingChange("type", value)
                            }
                          >
                            <SelectTrigger className="border-green-200 focus:ring-green-500">
                              <SelectValue placeholder="Select relationship" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="brother">Brother</SelectItem>
                              <SelectItem value="sister">Sister</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label>Medical Conditions</Label>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                            {commonConditions.map((condition) => (
                              <div
                                key={condition}
                                className="flex items-center space-x-2"
                              >
                                <Checkbox
                                  id={`sibling-${condition}`}
                                  checked={
                                    condition === "None of the above"
                                      ? newSibling.conditions.length === 0
                                      : newSibling.conditions.includes(
                                          condition
                                        )
                                  }
                                  onCheckedChange={() =>
                                    handleNewSiblingConditionSelect(condition)
                                  }
                                  className="border-green-500 text-green-600"
                                />
                                <Label htmlFor={`sibling-${condition}`}>
                                  {condition}
                                </Label>
                              </div>
                            ))}
                          </div>

                          {newSibling.conditions.length > 0 && (
                            <div className="mt-4">
                              <Label>Selected conditions:</Label>
                              <div className="flex flex-wrap gap-2 mt-2">
                                {newSibling.conditions.map((condition) => (
                                  <Badge
                                    key={condition}
                                    className="bg-green-100 text-green-800 hover:bg-green-200 flex items-center gap-1"
                                  >
                                    {condition}
                                    <button
                                      className="ml-1 h-4 w-4 rounded-full inline-flex items-center justify-center hover:bg-green-200"
                                      onClick={() =>
                                        handleNewSiblingConditionRemove(
                                          condition
                                        )
                                      }
                                    >
                                      ✕
                                    </button>
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="flex space-x-2 pt-2">
                          <Button
                            variant="outline"
                            onClick={() => {
                              setIsAddingSibling(false);
                              setNewSibling({
                                type: "brother",
                                conditions: [],
                              });
                            }}
                            className="border-green-200 text-green-700 hover:bg-green-50"
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={handleAddSibling}
                            disabled={!newSibling.type}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            Add Sibling
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </CardContent>

            <CardFooter className="flex justify-between pt-6 border-t p-6">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="border-green-200 text-green-700 hover:bg-green-50"
              >
                Previous
              </Button>
              <Button
                onClick={nextStep}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {currentStep === totalSteps ? "Submit" : "Next"}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
