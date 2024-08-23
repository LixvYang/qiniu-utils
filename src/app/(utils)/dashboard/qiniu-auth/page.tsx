/* eslint-disable @typescript-eslint/no-floating-promises */
"use client";

import { useForm, type SubmitHandler } from "react-hook-form";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/app/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify"; // Ensure you have react-toastify installed
import { useState } from "react";
import { formDataSchema } from "@/types/types";
import { createHmac } from "crypto";

// Define the schema using Zod
interface FormData {
  ak: string;
  sk: string;
  method: string;
  url: string;
  body: string;
}

export default function AuthForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formDataSchema), // Use zodResolver for validation
  });

  const [copied, setCopied] = useState(false); // State to manage copy status

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const curlCommand = generateCurlCommand(data);
    console.log("CURL command:", curlCommand);

    try {
      navigator.clipboard.writeText(curlCommand); // Copy the CURL command to clipboard
      toast.success("CURL command copied to clipboard!"); // Notify user
    } catch (err) {
      toast.error("Failed to copy CURL command."); // Handle error
      console.error("Error copying text: ", err);
    }

    // Copy to clipboard logic can be added here
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  };

  const generateCurlCommand = (data: FormData) => {
    const method = data.method.toUpperCase();
    const url = new URL(data.url);
    const path = url.pathname + url.search;

    let signData = `${method} ${path}`;
    signData += `\nHost: ${url.host}`;

    const contentType = "application/json"; // 假设请求体为 JSON 格式
    if (data.body) {
      signData += `\nContent-Type: ${contentType}`;
    }

    signData += `\n\n`;

    if (data.body && data.body.trim() !== "") {
      signData += data.body; // 仅在请求体存在时添加
    }

    const hmac = createHmac("sha1", data.sk);
    const signature = hmac.update(signData).digest("base64");
    const encodedSign = signature.replace(/\+/g, "-").replace(/\//g, "_");

    const qiniuToken = `Qiniu ${data.ak}:${encodedSign}`;
    let curlCommand = `curl -vvv -X${data.method} '${data.url}'  -H 'Authorization: ${qiniuToken}'`;
    if (data.body) {
      curlCommand += ` -H 'Content-Type: ${contentType}' -d '${data.body}'`;
    }

    return curlCommand;
  };

  // Handle error display on submit
  const handleError = () => {
    if (errors.ak) toast.error(errors.ak.message);
    if (errors.sk) toast.error(errors.sk.message);
    if (errors.method) toast.error(errors.method.message);
    if (errors.url) toast.error(errors.url.message);
  };

  return (
    <div className="p-4">
      <h1 className="mb-4 text-lg font-semibold">Auth Input Form</h1>

      <form onSubmit={handleSubmit(onSubmit, handleError)}>
        <div className="mb-4">
          <label className="mb-1 block">Access Key (AK)</label>
          <Input
            type="text"
            {...register("ak")}
            placeholder="Enter Access Key"
          />
          {errors.ak && <p className="text-red-500">{errors.ak.message}</p>}
        </div>

        <div className="mb-4">
          <label className="mb-1 block">Secret Key (SK)</label>
          <Input
            type="text"
            {...register("sk")}
            placeholder="Enter Secret Key"
          />
          {errors.sk && <p className="text-red-500">{errors.sk.message}</p>}
        </div>

        <div className="mb-4">
          <label className="mb-1 block">HTTP Method</label>
          <Select onValueChange={(value) => setValue("method", value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select HTTP Method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="GET">GET</SelectItem>
              <SelectItem value="POST">POST</SelectItem>
              <SelectItem value="PUT">PUT</SelectItem>
              <SelectItem value="DELETE">DELETE</SelectItem>
              <SelectItem value="PATCH">PATCH</SelectItem>
            </SelectContent>
          </Select>
          {errors.method && (
            <p className="text-red-500">{errors.method.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="mb-1 block">URL</label>
          <Textarea {...register("url")} placeholder="Enter URL" rows={3} />
          {errors.url && <p className="text-red-500">{errors.url?.message}</p>}
        </div>

        <div className="mb-4">
          <label className="mb-1 block">HTTP Body</label>
          <Textarea
            {...register("body")}
            placeholder="Enter HTTP Body"
            rows={5}
          />
        </div>

        <Button type="submit" className="w-full">
          {copied ? "Copied!" : "Generate CURL results and copy to clipboard"}
        </Button>
      </form>
    </div>
  );
}
