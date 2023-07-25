import { NextResponse } from "next/server";

const DATA_SOURCE_URL = "https://jsonplaceholder.typicode.com/todos";

export async function GET(req: Request) {
  const origin = req.headers.get("origin");
  const data = await fetch(DATA_SOURCE_URL);
  const todos: Todo[] = await data.json();

  return new NextResponse(JSON.stringify(todos), {
    headers: {
      "Access-Control-Allow-Origin": origin || "*",
      "Content-Type": "application/json"
    }
  });
}

export async function DELETE(req: Request) {
  const { id }: Pick<Todo, "id"> = await req.json();

  if (!id) return new NextResponse("Todo id required");

  await fetch(`${DATA_SOURCE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "API-Key": process.env.DATA_API_KEY as string,
    },
  });
  return new NextResponse(`Todo ${id} deleted`);
}

export async function POST(req: Request) {
  const { title, userId }: Pick<Todo, "title" | "userId"> = await req.json();

  if (!title) return new NextResponse("Title for todo is required");
  if (!userId) return new NextResponse("userId for todo is required");

  const response = await fetch(`${DATA_SOURCE_URL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "API-Key": process.env.DATA_API_KEY as string,
    },
    body: JSON.stringify({
      id: 201,
      userId,
      title,
      completed: false,
    }),
  });

  const newTodo = await response.json();

  return NextResponse.json({
    message: `Todo "${title}" created`,
    todo: newTodo,
  });
}

export async function PUT(req: Request) {
  const { title, id, userId, completed }: Todo = await req.json();

  if (!title) return new NextResponse("Title for todo is required");
  if (!id) return new NextResponse("id for todo is required");
  
  const response = await fetch(`${DATA_SOURCE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "API-Key": process.env.DATA_API_KEY as string,
    },
    body: JSON.stringify({
      userId,
      title,
      completed
    }),
  });

  const newTodo = await response.json();

  return NextResponse.json({
    message: `Todo "${title}" created`,
    todo: newTodo,
  });
}
