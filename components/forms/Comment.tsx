'use client'

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import * as z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { usePathname } from "next/navigation"
import { commentValidation } from "@/lib/validation/thread"
import Image from "next/image"
import { addComment } from "@/lib/actions/thread.actions"

interface CommentProps {
    threadId: string
    currentUserImg: string,
    currentUserId: string
}

const Comment = ({ threadId, currentUserImg, currentUserId }: CommentProps) => {

    const pathname = usePathname()

    const form = useForm({
        resolver: zodResolver(commentValidation),
        defaultValues: {
            thread: '',
        },
    })

    const onSubmit = async (values: z.infer<typeof commentValidation>) => {
        await addComment(
            threadId,
            values.thread,
            JSON.parse(currentUserId),
            pathname
        )
        form.reset()
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="comment-form">
                <FormField
                    control={form.control}
                    name="thread"
                    render={({ field }) => (
                        <FormItem className="flex items-center w-full gap-3">
                            <FormLabel>
                                <Image
                                    src={currentUserImg}
                                    alt="user image"
                                    width={48}
                                    height={48}
                                    className="object-cover rounded-full"
                                />
                            </FormLabel>
                            <FormControl className="bg-transparent border-none">
                                <Input
                                    type="text"
                                    placeholder="Comment..."
                                    className="outline-none no-focus text-light-1"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="comment-form_btn">
                    Reply
                </Button>
            </form>
        </Form>
    );
}

export default Comment;
