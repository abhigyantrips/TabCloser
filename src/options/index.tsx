"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { z } from "zod";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getLocalStorage, setLocalStorage } from "@/lib/storage";
import { getColumns } from "@/options/columns";
import { DataTable } from "@/options/data-table";

import "@/styles/globals.css";

import { Switch } from "@/components/ui/switch";
import { closeTabsOnAdded, closeTabsOnEnabled } from "@/lib/tabs";

const formSchema = z.object({
  url: z.string().url("Please enter a valid URL."),
});

export default function Options() {
  const [enabled, setEnabled] = useState(false);
  const [siteList, setSiteList] = useState([]);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: "",
    },
  });

  useEffect(() => {
    (async () => {
      const extensionEnabled = await getLocalStorage("EXTENSION_ENABLED");
      const extensionUrlList = await getLocalStorage("EXTENSION_URL_LIST");

      setEnabled(extensionEnabled ?? false);
      setSiteList(extensionUrlList ?? []);
    })();
  }, []);

  const onDelete = useCallback(
    (url: string) => {
      const newSiteList = siteList.filter((value) => value !== url);
      setLocalStorage("EXTENSION_URL_LIST", newSiteList);
      setSiteList(newSiteList);

      toast.success("URL removed successfully.");
    },
    [siteList]
  );
  const columns = useMemo(() => getColumns({ onDelete }), [siteList]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const url = new URL(values.url);
    const newSiteList = [...siteList, url.hostname];

    form.setValue("url", "");
    setSiteList(newSiteList);
    setLocalStorage("EXTENSION_URL_LIST", newSiteList);
    await closeTabsOnAdded(url.hostname);
  }

  return (
    <div className="relative flex flex-col bg-background font-sans antialiased">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Header />
        <div className="container flex-1">
          <div className="mx-auto flex min-h-[calc(100vh_-_theme(spacing.32))] max-w-screen-md flex-col gap-2 p-6">
            <div className="flex flex-row items-center justify-between space-y-0.5 border-b pb-6 pt-3">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  enable extension.
                </h2>
                <p className="text-muted-foreground">
                  this setting will be saved when you close the browser.
                </p>
              </div>
              <Switch
                checked={enabled}
                onCheckedChange={async (checked) => {
                  setEnabled(checked);
                  setLocalStorage("EXTENSION_ENABLED", checked);
                  if (checked) await closeTabsOnEnabled();
                }}
              />
            </div>

            <div className="space-y-0.5 border-b pb-6">
              <h2 className="text-2xl font-semibold tracking-tight">
                sites to{" "}
                <span className="line-through decoration-primary decoration-4">
                  block
                </span>{" "}
                close.
              </h2>
              <p className="text-muted-foreground">
                add links and other stuff that you'd like to{" "}
                <span className="line-through decoration-2">block</span> close.
              </p>
            </div>

            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-5 gap-3 py-6">
                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem className="col-span-4">
                      <FormControl>
                        <Input placeholder="Enter a URL..." {...field} />
                      </FormControl>
                      <FormDescription>
                        {" "}
                        On entering a URL, all its subpages will also be closed
                        automatically.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="col-span-1">
                  Submit
                </Button>
              </form>
            </Form>
            <DataTable
              columns={columns}
              data={siteList.map(function (value, index) {
                return { id: index, url: value };
              })}
            />
          </div>
        </div>
        <Footer />
      </ThemeProvider>
      <Toaster />
    </div>
  );
}
