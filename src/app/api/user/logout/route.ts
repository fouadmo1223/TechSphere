import { NextRequest, NextResponse } from "next/server";

import { cookies } from "next/headers";
/**
 * @method GET
 * @route ~/api/user/logout
 * @desc  Delete Cookie
 * @access public
 */




export async function GET(request: NextRequest) {
    try {
        const cookieStore = cookies();
        (await cookieStore).delete("token");
        return NextResponse.json({ message: "Logged out successfully" });
    } catch (error) {
        console.error("Logout error:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}