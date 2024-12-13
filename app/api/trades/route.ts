// app/api/trades/route.ts

import { prisma } from '@/lib/db'; // Ensure you have Prisma set up
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { title, description, offeredItems, requestedItems, userId } = await req.json();

    // Validate input (optional)
    if (!title || !description || !offeredItems || !requestedItems || !userId) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Ensure offeredItems and requestedItems are strings, convert them if necessary
    const offeredItemsArray = Array.isArray(offeredItems)
      ? offeredItems
      : offeredItems.split(','); // Split string if it's not already an array

    const requestedItemsArray = Array.isArray(requestedItems)
      ? requestedItems
      : requestedItems.split(','); // Split string if it's not already an array

    // Create a new trade in the database using Prisma
    const newTrade = await prisma.trade.create({
      data: {
        title,
        description,
        offeredItems: offeredItemsArray,
        requestedItems: requestedItemsArray,
        user: { connect: { id: userId } },
      },
    });

    // Return the newly created trade
    return NextResponse.json(newTrade, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Failed to create trade'},
      { status: 500 }
    );
  }
}
