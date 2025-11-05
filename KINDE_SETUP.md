# Kinde Authentication Setup Guide for JengaCode Admin Dashboard

This guide explains how to set up Kinde authentication with role-based access control for the JengaCode admin dashboard.

## ✅ What's Already Done

1. ✅ Kinde auth route handler created at `app/api/auth/[kindeAuth]/route.ts`
2. ✅ Environment variables configured with your Kinde credentials
3. ✅ Prisma PostgreSQL schema set up with Neon database
4. ✅ Kinde provider integrated into the app layout
5. ✅ Admin pages updated to use Kinde authentication
6. ✅ Admin layout protected and requires authentication

## 📋 Next Steps: Configure Kinde Organizations & Roles

### Step 1: Create Organizations in Kinde Dashboard

1. Go to [https://jengacode.kinde.com](https://jengacode.kinde.com)
2. Navigate to **Organizations**
3. Create the following organizations:
   - **JengaCode Admin** (for admins)
   - **JengaCode Editors** (for editors)
   - **JengaCode Volunteers** (for volunteers)

### Step 2: Create Roles within Organizations

For each organization, create the following roles:

#### In "JengaCode Admin" organization:
- **Role Name**: `admin`
- **Permissions**: Full access to all dashboard features

#### In "JengaCode Editors" organization:
- **Role Name**: `editor`
- **Permissions**: Content management (events, blog, challenges, testimonials, team)

#### In "JengaCode Volunteers" organization:
- **Role Name**: `volunteer`
- **Permissions**: Media upload, dashboard view (read-only)

### Step 3: Create Demo Users

Create the following demo users in Kinde:

#### Admin User
- **Email**: `admin@jengacode.org`
- **Password**: (set a secure password)
- **Organization**: JengaCode Admin
- **Role**: admin

#### Editor User
- **Email**: `editor@jengacode.org`
- **Password**: (set a secure password)
- **Organization**: JengaCode Editors
- **Role**: editor

#### Volunteer User
- **Email**: `volunteer@jengacode.org`
- **Password**: (set a secure password)
- **Organization**: JengaCode Volunteers
- **Role**: volunteer

### Step 4: Verify Setup

After creating the users and organizations:

1. Go to **Settings** > **Tokens** in Kinde dashboard
2. Copy your API tokens for backend operations (optional, for API calls)
3. Test login by visiting `http://localhost:3000/admin`
4. You should be redirected to Kinde login
5. After successful login, you'll be redirected to the admin dashboard

## 🔐 Authentication Flow

The app uses the following authentication flow:

```
User visits /admin
    ↓
Checks if authenticated with Kinde
    ↓
If not authenticated → Redirect to Kinde login
    ↓
User logs in with email/password
    ↓
Kinde validates and returns user info
    ↓
User redirected to dashboard
    ↓
Admin layout checks user role for access control
```

## 📱 Usage in Components

### Using Kinde Auth in Components

```typescript
import { useKindeAuth } from "@kinde-oss/kinde-auth-nextjs";

export function MyComponent() {
  const { user, isAuthenticated, logout } = useKindeAuth();

  if (!isAuthenticated) {
    return <p>Please log in</p>;
  }

  return (
    <div>
      <p>Welcome, {user?.name}</p>
      <p>Email: {user?.email}</p>
      <button onClick={() => logout()}>Logout</button>
    </div>
  );
}
```

## 🗄️ Database Integration

All admin actions are stored in PostgreSQL (Neon) via Prisma:

- Events, blog posts, media, testimonials, challenges, and team members are all stored in the database
- User information is synced from Kinde
- Each content item is linked to the user who created it

### Example: Creating an Event

```typescript
import { prisma } from "@/lib/prisma";

const newEvent = await prisma.event.create({
  data: {
    title: "Summer Coding Camp",
    slug: "summer-coding-camp",
    shortDescription: "...",
    fullDescription: "...",
    date: "2025-08-15",
    location: "JengaCode Hub",
    category: "camp",
    createdById: user.id, // Linked to current user
  },
});
```

## 🚀 Deploying to Production

When deploying to production:

1. Update `KINDE_SITE_URL` to your production domain
2. Update `KINDE_POST_LOGIN_REDIRECT_URL` to your production dashboard URL
3. Update `KINDE_POST_LOGOUT_REDIRECT_URL` to your production home URL
4. Add the production domain to Kinde's **Allowed redirect URLs**
5. Update the PostgreSQL connection string to your production database

## ❓ Troubleshooting

### Issue: "Unauthorized" when accessing /admin

**Solution**: Make sure you're logged in with a user that has the correct organization/role.

### Issue: Kinde login redirects to blank page

**Solution**: Check that your redirect URLs in Kinde match exactly:
- In Kinde Settings → Callback URLs
- Add: `http://localhost:3000/api/auth/callback`
- Add: `http://localhost:3000/api/auth/logout`

### Issue: Cannot find Kinde user in database

**Solution**: Run the sync-kinde-users script (when implemented) to sync Kinde users to your database.

## 📚 Additional Resources

- [Kinde Docs](https://docs.kinde.com)
- [Kinde NextJS SDK](https://docs.kinde.com/developer-tools/sdks/nextjs-sdk)
- [Prisma Docs](https://www.prisma.io/docs/)
- [Neon PostgreSQL Docs](https://neon.tech/docs)

## 🔄 Summary of Files Modified/Created

- ✅ `app/api/auth/[kindeAuth]/route.ts` - Kinde auth handler
- ✅ `prisma/schema.prisma` - PostgreSQL database schema
- ✅ `lib/prisma.ts` - Prisma client singleton
- ✅ `components/admin/kinde-admin-layout.tsx` - Protected admin layout
- ✅ `app/layout.tsx` - Added KindeProvider
- ✅ All admin pages updated to use KindeAdminLayout

## Next Steps

1. ✅ Set up Kinde organizations and roles (see steps above)
2. ✅ Create demo users in Kinde
3. ✅ Test the authentication flow
4. 🔄 Implement Prisma operations for CRUD (events, blog, media, etc.)
5. 🔄 Sync Kinde user data to PostgreSQL database
6. 🔄 Implement role-based access control middleware

---

**Status**: Authentication infrastructure ready. Awaiting Kinde organization/role setup.
