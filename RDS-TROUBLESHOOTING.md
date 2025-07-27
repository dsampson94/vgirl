# 🔧 AWS RDS Connection Troubleshooting Guide

## Connection Error: P1001 - Can't reach database server

### Current Issue
- RDS Endpoint: vgirl.c9gksmyc8wak.eu-central-1.rds.amazonaws.com:5432
- Database: postgres
- Username: postgres  
- Password: oP189HZWkyEVZPZJ9jVA ✅

### 🛠️ Steps to Fix Connection Issues

#### 1. Check RDS Instance Status
- Go to AWS Console → RDS → Databases → vgirl
- Ensure Status shows "Available" (not "Backing-up" or other states)
- Wait if it's still in backup/maintenance mode

#### 2. Configure Security Group (Most Common Issue)
- In RDS Console → vgirl → Connectivity & security
- Click on the VPC security group link (default sg-03b0b5d0e5eba76da)
- Go to "Inbound rules" tab
- Click "Edit inbound rules"
- Add/modify rule:
  - Type: PostgreSQL
  - Protocol: TCP
  - Port: 5432
  - Source: 
    - For testing: 0.0.0.0/0 (allows all IPs - less secure)
    - For production: Your specific IP address
- Click "Save rules"

#### 3. Check Public Accessibility
- In RDS Console → vgirl → Connectivity & security
- Verify "Publicly accessible" is set to "Yes"
- If not, modify the DB instance to enable public access

#### 4. Check Your Current IP
Run this command to see your current public IP:
```bash
curl ifconfig.me
```
Then ensure this IP is allowed in the security group.

#### 5. Alternative: Test Connection Manually
Try connecting with psql (if installed):
```bash
psql -h vgirl.c9gksmyc8wak.eu-central-1.rds.amazonaws.com -p 5432 -U postgres -d postgres
```

#### 6. Check Network ACLs (Advanced)
- VPC → Network ACLs
- Ensure the subnet's Network ACL allows inbound/outbound traffic on port 5432

### 🔄 After Fixing Security Groups
Once you've updated the security group rules, try again:
```bash
npx prisma db push
```

### 🌱 Then Run the Seed
After successful schema push:
```bash
npm run db:seed
```

### 📊 View Your Data
Open Prisma Studio to see the seeded data:
```bash
npx prisma studio
```

### ⚠️ Security Note
Remember to restrict the security group to your specific IP addresses in production rather than using 0.0.0.0/0.

### 📞 Need Help?
If still having issues:
1. Check AWS CloudTrail for connection attempts
2. Verify the RDS instance isn't in a private subnet only
3. Check if there are any database parameter group restrictions
