import { ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SocialInfo = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Media Links</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {/* Facebook */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div>
                <p className="font-medium">Facebook</p>
                <a
                  href="https://facebook.com/pooja.chatterjee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  facebook.com/pooja.chatterjee
                </a>
              </div>
            </div>
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </div>

          {/* Twitter */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div>
                <p className="font-medium">Twitter</p>
                <Badge variant="secondary">Not Available</Badge>
              </div>
            </div>

            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </div>

          {/* LinkedIn */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div>
                <p className="font-medium">LinkedIn</p>
                <a
                  href="https://linkedin.com/in/poojachatterjee"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  linkedin.com/in/poojachatterjee
                </a>
              </div>
            </div>

            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </div>

          {/* Instagram */}
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <div>
                <p className="font-medium">Instagram</p>
                <Badge variant="secondary">Not Available</Badge>
              </div>
            </div>

            <ExternalLink className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SocialInfo;
