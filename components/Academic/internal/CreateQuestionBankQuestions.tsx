"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateQuestionBankQuestions() {
  const [correctAnswer, setCorrectAnswer] = useState<number | null>(null);
  const [questionType, setQuestionType] = useState("mcq");
  const selectCorrectAnswer = (index: number) => {
    setCorrectAnswer(index);
  };

  const options = [1, 2, 3, 4];

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div>
        <h1 className="text-2xl font-bold">Add Question</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Question Information</CardTitle>
        </CardHeader>

        <CardContent>
          <form className="space-y-6">
            {/* Class & Subject */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>
                  Class <span className="text-destructive">*</span>
                </Label>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Class" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="1">Class 1</SelectItem>
                    <SelectItem value="2">Class 2</SelectItem>
                    <SelectItem value="3">Class 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>
                  Subject <span className="text-destructive">*</span>
                </Label>

                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Subject" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="maths">Maths</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Marks & Type */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Label>
                  Marks <span className="text-destructive">*</span>
                </Label>

                <Input type="number" min={1} defaultValue={1} />
              </div>

              <div className="space-y-2">
                <Label>
                  Question Type <span className="text-destructive">*</span>
                </Label>

                <Select value={questionType} onValueChange={setQuestionType}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="mcq">
                      Multiple Choice Question (MCQ)
                    </SelectItem>

                    <SelectItem value="short">Short Answer</SelectItem>

                    <SelectItem value="long">Long Answer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Question */}
            <div className="space-y-2">
              <Label>
                Question Text <span className="text-destructive">*</span>
              </Label>

              <Textarea placeholder="Enter question..." rows={4} />
            </div>

            {/* Options */}
            {questionType === "mcq" && (
              <div className="space-y-4">
                <Label>Options</Label>

                <div className="grid gap-4">
                  {options.map((option, index) => {
                    const checked = correctAnswer === index;

                    return (
                      <div
                        key={option}
                        className={`rounded-lg border p-4 transition-all ${
                          checked
                            ? "border-green-500 bg-green-50 dark:bg-green-950/20"
                            : "hover:bg-muted/50"
                        }`}
                      >
                        <div className="flex flex-col gap-3 md:flex-row md:items-center">
                          <div className="flex-1">
                            <Label className="mb-2 block">
                              Option {option}
                            </Label>

                            <Input placeholder={`Enter option ${option}`} />
                          </div>

                          <label className="flex items-center gap-2 whitespace-nowrap">
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => selectCorrectAnswer(index)}
                              className="h-4 w-4"
                            />

                            <span className="text-sm font-medium">
                              Correct Answer
                            </span>
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {questionType !== "mcq" && (
              <div className="space-y-2">
                <Label>
                  Model Answer <span className="text-destructive">*</span>
                </Label>

                <Textarea
                  placeholder="Enter expected answer..."
                  rows={questionType === "long" ? 6 : 4}
                />
              </div>
            )}

            {/* Actions */}
            <div className="flex gap-3">
              <Button type="submit">Save Question</Button>

              <Link href="/academic/question-bank/questions">
                <Button variant="outline">Cancel</Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
