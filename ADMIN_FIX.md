# Admin Dashboard Fix

## Problem
The admin dashboard cannot update data or view user submissions because of Row Level Security (RLS) policies in Supabase.

## Solution
Run the SQL script to add admin policies for authenticated users.

## Steps to Fix:

### 1. Go to Supabase Dashboard
- Open https://supabase.com
- Select your project
- Go to **SQL Editor**

### 2. Run the Admin Policies Script
- Copy ALL content from `supabase-admin-policies.sql`
- Paste into SQL Editor
- Click **Run**

### 3. Verify the Fix
- Login to admin dashboard at `/admin`
- Try updating an activity or booking status
- Changes should now save successfully
- User bookings should now be visible

## What This Does
The script adds RLS policies that allow authenticated users (logged in admins) to:
- View ALL data (not just public data)
- Update existing records
- Insert new records
- Delete records

## Important Notes
- You must be logged in to the admin dashboard for these policies to work
- Public users (not logged in) still have restricted access
- This is secure because only authenticated admin users can perform these operations

## Troubleshooting

**Still can't see bookings?**
- Make sure you're logged in to the admin dashboard
- Check that the SQL script ran without errors
- Verify your .env.local has correct Supabase credentials

**Can't update activities?**
- Ensure you ran the complete SQL script
- Try logging out and back in
- Check browser console for errors

**Need to reset?**
- You can drop and recreate policies in Supabase SQL Editor
- Or disable RLS temporarily: `ALTER TABLE table_name DISABLE ROW LEVEL SECURITY;`
