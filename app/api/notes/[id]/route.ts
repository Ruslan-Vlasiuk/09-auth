import { NextRequest, NextResponse } from 'next/server';
import { api } from '../../api';
import { cookies } from 'next/headers';
import { isAxiosError } from 'axios';
import { logErrorResponse } from '../../_utils/utils';

type Props = { params: Promise<{ id: string }> };

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const res = await api.get(`/notes/${id}`, {
      headers: { Cookie: cookieStore.toString() },
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const cookieStore = await cookies();
    const res = await api.delete(`/notes/${id}`, {
      headers: { Cookie: cookieStore.toString() },
    });
    return NextResponse.json(res.data, { status: res.status });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status }
      );
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
