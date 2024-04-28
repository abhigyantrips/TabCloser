'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const formSchema = z.object({
  url: z.string().url('Please enter a valid URL.'),
});

export default function SettingsPage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      url: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="mx-32 flex min-h-[calc(100vh_-_theme(spacing.32))] flex-col gap-2 p-6">
      <div className="space-y-0.5 border-b pb-6">
        <h2 className="text-2xl font-semibold tracking-tight">
          sites to <span className="line-through decoration-primary decoration-4">block</span> close.
        </h2>
        <p className="text-muted-foreground">
          add links and other stuff that you'd like to <span className="line-through decoration-2">block</span> close.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-5 gap-3 py-6">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem className="col-span-4">
                <FormControl>
                  <Input placeholder="https://instagram.com/direct/inbox" {...field} />
                </FormControl>
                <FormDescription>
                  On entering a URL, all its subpages will also be closed automatically.
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
    </div>
  );
}
