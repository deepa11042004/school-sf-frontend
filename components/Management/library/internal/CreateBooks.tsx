"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, FileText } from "lucide-react";

export default function CreateBooks() {
  const [bookTitle, setBookTitle] = useState("");
  const [bookType, setBookType] = useState("hardcover");
  const [subject, setSubject] = useState("");
  const [isbn, setIsbn] = useState("");
  const [author, setAuthor] = useState("");
  const [publisher, setPublisher] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header Section */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Add New Book
          </h1>
        </div>

        {/* Form Card */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle>Book Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Book Title */}
                <div className="space-y-2">
                  <Label>
                    Book Title <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    placeholder="Enter book title"
                    value={bookTitle}
                    onChange={(e) => setBookTitle(e.target.value)}
                    className="focus-visible:ring-indigo-500"
                  />
                </div>

                {/* Book Type */}
                <div className="space-y-2">
                  <Label>
                    Book Type <span className="text-destructive">*</span>
                  </Label>
                  <Select value={bookType} onValueChange={setBookType}>
                    <SelectTrigger className="focus-visible:ring-indigo-500">
                      <SelectValue placeholder="Select Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hardcover">Hardcover</SelectItem>
                      <SelectItem value="paperback">Paperback</SelectItem>
                      <SelectItem value="ebook">E-Book</SelectItem>
                      <SelectItem value="audiobook">Audiobook</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <Label>Subject</Label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger className="focus-visible:ring-indigo-500">
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="math">Mathematics</SelectItem>
                      <SelectItem value="science">Science</SelectItem>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                      <SelectItem value="general">General Knowledge</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* ISBN */}
                <div className="space-y-2">
                  <Label>ISBN</Label>
                  <Input
                    placeholder="Enter ISBN number"
                    value={isbn}
                    onChange={(e) => setIsbn(e.target.value)}
                    className="focus-visible:ring-indigo-500"
                  />
                </div>

                {/* Author */}
                <div className="space-y-2">
                  <Label>Author</Label>
                  <Input
                    placeholder="Enter author name"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="focus-visible:ring-indigo-500"
                  />
                </div>

                {/* Publisher */}
                <div className="space-y-2">
                  <Label>Publisher</Label>
                  <Input
                    placeholder="Enter publisher name"
                    value={publisher}
                    onChange={(e) => setPublisher(e.target.value)}
                    className="focus-visible:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  placeholder="Enter book description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="min-h-[100px] focus-visible:ring-indigo-500"
                />
              </div>

              {/* Cover Image Upload */}
              <div className="space-y-2">
                <Label>Cover Image</Label>
                <label
                  htmlFor="cover-upload"
                  className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 transition hover:border-primary/50 hover:bg-muted/30"
                >
                  <Upload className="mb-3 h-8 w-8 text-muted-foreground" />
                  <p className="font-medium">
                    {file ? "Change image" : "Click to upload or drag and drop"}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {file ? file.name : "PNG, JPG, GIF up to 5MB"}
                  </p>
                  <input
                    id="cover-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files?.[0] || null)}
                  />
                </label>
                {!file && (
                  <p className="text-xs text-muted-foreground mt-1">
                    No file chosen
                  </p>
                )}
                {file && (
                  <div className="flex items-center gap-3 rounded-lg border bg-muted/40 p-3 mt-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setFile(null)}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      Remove
                    </Button>
                  </div>
                )}
              </div>

              {/* Quantity */}
              <div className="space-y-2">
                <Label>Quantity (Copies)</Label>
                <Input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-32 focus-visible:ring-indigo-500"
                />
                <p className="text-xs text-muted-foreground">
                  Auto-generates copies.
                </p>
              </div>

              {/* Footer Actions */}
              <div className="flex flex-wrap gap-3 justify-start pt-4 border-t">
                <Button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
                >
                  Save Changes
                </Button>

                <Link href="/management/library/books">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
