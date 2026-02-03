import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function VendorProfile() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    api.get("/vendors/profile").then(res => setProfile(res.data));
  }, []);

  return (
    <div>
      <h2>Vendor Profile</h2>
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </div>
  );
}
