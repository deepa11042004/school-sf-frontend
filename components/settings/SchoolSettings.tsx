"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, Trash2, Save } from "lucide-react";

export default function SchoolSettings() {
  const [schoolName, setSchoolName] = useState("");
  const [schoolNo, setSchoolNo] = useState("");
  const [affiliationNo, setAffiliationNo] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [fax, setFax] = useState("");
  const [website, setWebsite] = useState("");
  const [receiptCopies, setReceiptCopies] = useState("2");

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFileName, setLogoFileName] = useState("");

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setLogoFileName(file.name);

    const previewUrl = URL.createObjectURL(file);
    setLogoPreview(previewUrl);
  };

  const removeLogo = () => {
    setLogoPreview(null);
    setLogoFileName("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saving settings...");
  };

  return (
    <div className="min-h-screen p-4 md:p-6 lg:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header Section */}

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
          School Settings
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* School Information */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>School Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="schoolName">School Name</Label>
                  <Input
                    id="schoolName"
                    value={schoolName}
                    onChange={(e) => setSchoolName(e.target.value)}
                    placeholder="Enter school name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="schoolNo">School No.</Label>
                  <Input
                    id="schoolNo"
                    value={schoolNo}
                    onChange={(e) => setSchoolNo(e.target.value)}
                    placeholder="Enter school number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="affiliationNo">Affiliation No.</Label>
                  <Input
                    id="affiliationNo"
                    value={affiliationNo}
                    onChange={(e) => setAffiliationNo(e.target.value)}
                    placeholder="Enter affiliation number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter phone number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fax">Fax</Label>
                  <Input
                    id="fax"
                    value={fax}
                    onChange={(e) => setFax(e.target.value)}
                    placeholder="Enter fax number"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="Enter website URL"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Fee Receipt Copies</Label>
                  <Select
                    value={receiptCopies}
                    onValueChange={setReceiptCopies}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select copies" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Copy (Student Copy)</SelectItem>
                      <SelectItem value="2">
                        2 Copies (Student & Office Copy)
                      </SelectItem>
                      <SelectItem value="3">3 Copies</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Logo Upload */}
              <div className="space-y-3 pt-2">
                <Label>School Logo</Label>

                <div className="flex flex-col md:flex-row gap-4">
                  {/* Upload Box */}
                  <label
                    htmlFor="logo-upload"
                    className="flex-1 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 p-6 transition hover:border-primary/50 hover:bg-muted/30"
                  >
                    <Upload className="mb-2 h-6 w-6 text-muted-foreground" />

                    <p className="text-sm font-medium">
                      {logoFileName || "Upload School Logo"}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      Max 1024KB • JPG, PNG, SVG
                    </p>

                    <input
                      id="logo-upload"
                      type="file"
                      accept=".jpg,.jpeg,.png,.svg"
                      className="hidden"
                      onChange={handleLogoUpload}
                    />
                  </label>

                  {/* Preview */}
                  {logoPreview && (
                    <div className="w-full md:w-44">
                      <div className="rounded-lg border bg-zinc-300 dark:bg-neutral-800 p-3">
                        <p className="mb-2 text-xs font-medium ">
                          Preview
                        </p>

                        <div className="flex justify-center rounded-md  ">
                          <img
                            src={logoPreview}
                            alt="School Logo"
                            className="h-30 w-30 object-contain"
                          />
                        </div>

                        <p className="mt-2 truncate text-xs text-muted-foreground">
                          {logoFileName}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {logoPreview && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={removeLogo}
                    className="text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Remove Logo
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Address Information */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle>Address Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter full address"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    placeholder="Enter state"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="Enter postal code"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Enter country"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Footer Actions */}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-start">
            <Button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>

            <Button type="button" variant="outline">
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
