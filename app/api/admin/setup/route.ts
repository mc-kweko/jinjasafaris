import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Create admin client
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceKey) {
      console.error('Missing Supabase credentials', {
        url: !!supabaseUrl,
        key: !!serviceKey
      });
      return NextResponse.json(
        { error: 'Server configuration error: Missing Supabase credentials' },
        { status: 500 }
      );
    }

    const supabaseAdmin = createClient(supabaseUrl, serviceKey);

    // Create user
    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    if (error) {
      console.error('Supabase auth error:', error);
      return NextResponse.json(
        { error: error.message || 'Failed to create user' },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Admin user created successfully',
        user: { id: data.user?.id, email: data.user?.email }
      },
      { status: 201 }
    );
  } catch (err) {
    console.error('Setup error:', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to create admin user: ${message}` },
      { status: 500 }
    );
  }
}
