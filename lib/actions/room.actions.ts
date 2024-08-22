"use server";

import { parseStringify } from "./../utils";
import { nanoid } from "nanoid";
import { liveblocks } from "../liveblocks";
import { revalidatePath } from "next/cache";

export const createDocument = async ({
    userId,
    email,
}: CreateDocumentParams) => {
    const roomId = nanoid();

    try {
        const metadata = {
            creatorId: userId,
            email,
            title: "Untitled",
        };

        const usersAccesses: RoomAccesses = {
            [email]: ["room:write"],
        };

        const room = await liveblocks.createRoom(roomId, {
            defaultAccesses: [],
            metadata,
            usersAccesses,
        });

        revalidatePath("/");

        return parseStringify(room);
    } catch (err) {
        console.log(`Error while creating a room: ${err}`);
    }
};
