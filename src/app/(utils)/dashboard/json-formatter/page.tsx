/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Textarea } from "@/app/components/ui/textarea";

const JsonFormatter = () => {
  const [inputJson, setInputJson] = useState("{}");
  const [formattedJson, setFormattedJson] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // 实时格式化 JSON 字符串
  useEffect(() => {
    try {
      const jsonObject = JSON.parse(inputJson); // 尝试解析输入的 JSON 字符串
      const prettyJson = JSON.stringify(jsonObject, null, 2); // 格式化 JSON 字符串
      setFormattedJson(prettyJson);
      setErrorMessage(""); // 清除错误消息
    } catch (error) {
      setFormattedJson(""); // 清空格式化结果
      setErrorMessage("Invalid JSON"); // 设置错误消息
    }
  }, [inputJson]); // 依赖于 inputJson 变化

  return (
    <div className="flex h-screen flex-col items-start justify-start p-4 md:flex-row">
      <Card className="h-full w-full overflow-y-auto md:w-1/2">
        <CardHeader>
          <CardTitle>JSON Input</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Enter JSON string"
            value={inputJson}
            onChange={(e) => setInputJson(e.target.value)} // 更新输入值
            className="mb-2"
            rows={40}
          />
        </CardContent>
      </Card>

      <Card className="h-full w-full overflow-y-auto md:w-1/2">
        <CardHeader>
          <CardTitle>JSON Output</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-900 dark:text-white">
            {formattedJson && (
              <pre className="whitespace-pre-wrap">{formattedJson}</pre>
            )}
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default JsonFormatter;
