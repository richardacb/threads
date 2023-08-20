import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser, getActivity } from "@/lib/actions/user.actions";
import Link from "next/link";
import Image from "next/image";

const ActivityPage = async () => {

    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    //TODO: get Activities
    const activities = await getActivity(userInfo._id)

    return (
        <section>
            <h1 className="mb-10 head-text">
                ActivityPage
            </h1>
            <section className="flex flex-col gap-5 mt-10">
                {activities.length > 0 ? (
                    <>
                        {activities.map((activity) => (
                            <Link key={activity._id} href={`/thread/${activity.parentId}`}>
                                <article className="activity-card">
                                    <Image
                                        src={activity.author.image}
                                        alt="profile picture"
                                        width={20}
                                        height={20}
                                        className="object-cover rounded-full"
                                    />
                                    <p className="!text-small-regular text-light-1">
                                        <span className="mr-1 text-primary-500">
                                            {activity.author.name}
                                        </span>{" "}
                                        replied to your thread.
                                    </p>
                                </article>
                            </Link>
                        ))}
                    </>
                ) : (
                    <p className="!text-base-regular text-light-3">No activity</p>
                )}


            </section>
        </section>
    );
}

export default ActivityPage;
