import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { fetchUser, fetchUsersSearh } from "@/lib/actions/user.actions";
import UserCard from "@/components/cards/UserCard";

const SearchPage = async () => {

    const user = await currentUser();
    if (!user) return null;

    const userInfo = await fetchUser(user.id);
    if (!userInfo?.onboarded) redirect("/onboarding");

    //TODO: Fetch User Data
    const result = await fetchUsersSearh({
        userId: user.id,
        searchString: "",
        pageNumber: 1,
        pageSize: 25
    })

    return (
        <section>
            <h1 className="mb-10 head-text">Search</h1>

            {/*Search Bar */}
            <div className="flex flex-col mt-14 gap-9">
                {result.users.length === 0 ? (
                    <p className="no-result">No Users</p>
                ) : (
                    <>
                        {result.users.map((person) => (
                            <UserCard
                                key={person.id}
                                id={person.id}
                                name={person.name}
                                username={person.username}
                                imgUrl={person.image}
                                personType="User"
                            />
                        ))}
                    </>
                )}
            </div>
        </section>
    );
}

export default SearchPage;
