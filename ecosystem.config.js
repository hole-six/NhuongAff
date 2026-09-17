module.exports = {
  apps: [
    {
      name: "nhuongaff",
      script: "npm",
      args: "start -- -p 4502",
      cwd: "/var/www/nhuongaff",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};