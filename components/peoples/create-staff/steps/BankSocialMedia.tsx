"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const BankSocialMedia = () => {
  return (
     <div className="space-y-6 animate-in fade-in-0 slide-in-from-right-4 duration-300">
                  <div className="border-b pb-2 mb-4">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                      Bank Account Detail
                    </h3>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Account Name</Label>
                      <Input placeholder="Enter account name" />
                    </div>
                    <div className="space-y-2">
                      <Label>Account Number</Label>
                      <Input placeholder="Enter account number" />
                    </div>
                    <div className="space-y-2">
                      <Label>Bank Name</Label>
                      <Input placeholder="Enter bank name" />
                    </div>
                    <div className="space-y-2">
                      <Label>IFSC Code</Label>
                      <Input
                        placeholder="Enter IFSC code"
                        className="uppercase"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Branch Name</Label>
                      <Input placeholder="Enter branch name" />
                    </div>
                  </div>

                  <div className="border-b pb-2 mb-4 mt-8">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">
                      Social Media Links
                    </h3>
                  </div>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Facebook URL</Label>
                      <Input placeholder="https://facebook.com/..." />
                    </div>
                    <div className="space-y-2">
                      <Label>Twitter URL</Label>
                      <Input placeholder="https://twitter.com/..." />
                    </div>
                    <div className="space-y-2">
                      <Label>LinkedIn URL</Label>
                      <Input placeholder="https://linkedin.com/in/..." />
                    </div>
                    <div className="space-y-2">
                      <Label>Instagram URL</Label>
                      <Input placeholder="https://instagram.com/..." />
                    </div>
                  </div>
                </div>
  )
}

export default BankSocialMedia