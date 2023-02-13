import { updateProfileAction } from "../redux/actions/profileActions";
import ChangePassword from '../components/ChangePassword';
import { useSelector, useDispatch } from "react-redux";
import Sidebar from '../components/Sidebar';
import { toast } from 'react-toastify';
import ErrorPage from "./ErrorPage";
import "../css/Profile.css";
import React from 'react';

const Profile = () => {

  var { userInfo } = useSelector(state => state.signIn) || {};

  const dispatch = useDispatch();

  let btnRef = React.useRef(null);

  const [editProfile, setEditProfile] = React.useState(false);
  const [changePassword, setChangePassword] = React.useState(false);
  const [dropdown, setDropdown] = React.useState(false);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [postalCode, setPostalCode] = React.useState("");

  React.useEffect(() => {
    const closeDropdown = (event) => {
      try {
        if (!btnRef.current.contains(event.target)) {
          setDropdown(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
    document.addEventListener('click', closeDropdown);
    return () => { document.removeEventListener('click', closeDropdown) }
  }, []);

  const updateProfile = async () => {
    if (name === "" || email === "" || address === "" || country === "" || postalCode === "") {
      toast.error("Empty Fields Not Allowed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    const resp = await dispatch(updateProfileAction(name, address, country, postalCode))
    if (resp === "Profile updated successfully") {
      toast.success("Profile Updated Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    else {
      toast.error(resp, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    setEditProfile(false);
  }

  React.useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setAddress(userInfo.address);
      setCountry(userInfo.country);
      setPostalCode(userInfo.postalCode);
    }
  }, [userInfo]);

  return (
    <>
      {userInfo.name ?
        <div style={{ display: "flex" }}>
          <Sidebar />
          <div style={{ background: "rgb(246, 247, 251)", width: "100%", padding: '30px 2vw' }}>
            <div style={{ display: "flex" }}>
              {editProfile ?
                <h2 style={{ fontFamily: 'Roboto, sans-serif', verticalAlign: 'middle', fontSize: '32px', lineHeight: '40px', fontWeight: '300', marginBottom: "1.5rem" }}>

                  <div style={{ display: "flex", alignItems: "center" }}>
                    <span style={{ cursor: "pointer", fontFamily: 'Roboto, sans-serif', border: '1px solid rgb(66, 104, 246)', color: 'rgb(66, 104, 246)', boxSizing: 'border-box', borderRadius: '9999px', marginRight: '16px', marginTop: "6px", padding: '8px', lineHeight: '12px', minWidth: '34px', height: '34px' }} onClick={() => {
                      setEditProfile(false);
                    }}>
                      <svg focusable="false" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="16" height="16" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 8L10 3 10.7 3.7 6.4 8 10.7 12.3 10 13z"></path></svg>
                    </span>
                    <div>Edit</div>
                  </div>
                </h2>
                :
                <div>
                  <div style={{ fontSize: '20px', margin: '0 0 5px', letterSpacing: '.025em' }}>Profile</div>
                  <div style={{ fontSize: '13px', display: "flex", marginBottom: "1rem" }}>
                    <div style={{ color: "#37474f", marginRight: "12px" }}>Home</div>
                    <div style={{ color: "#868e96", marginRight: "7px" }}>/</div>
                    <div style={{ color: "#868e96" }}>Profile</div>
                  </div>
                </div>}
              {
                editProfile ? null :
                  <div style={{ marginLeft: "auto" }}>
                    <div id="profile-buttons">
                      <button onClick={() => setEditProfile(true)} style={{ background: "rgb(255, 255, 255)", border: "1px solid rgb(221, 221, 221)", borderRadius: "4px", padding: "8px 16px", fontSize: "14px", fontWeight: "500", color: "rgb(0, 0, 0)", cursor: "pointer", marginLeft: "auto", marginRight: "0px", marginTop: "auto", marginBottom: "auto" }}>
                        Edit Profile
                      </button>
                      <button onClick={() => setChangePassword(true)} style={{ background: "rgb(255, 255, 255)", border: "1px solid rgb(221, 221, 221)", borderRadius: "4px", padding: "8px 16px", fontSize: "14px", fontWeight: "500", color: "rgb(0, 0, 0)", cursor: "pointer", marginLeft: "0.5rem", marginRight: "0px", marginTop: "auto", marginBottom: "auto" }}>
                        Change Password
                      </button>
                    </div>
                    <div>
                      <img ref={btnRef} id="profile-mobile-button" src="img/icons/three-dots-vertical.svg" alt="three-dots-vertical" onClick={() => {
                        setDropdown(!dropdown)
                      }}
                        style={{ display: "none", marginLeft: "0.5rem", marginRight: "0px", marginTop: "auto", marginBottom: "auto" }} />
                      <ul id="profile-dropdown" style={{ display: dropdown ? "block" : "none" }}>
                        <li>
                          <div href="/profile/edit" onClick={() => setEditProfile(true)}>Edit Profile</div>
                        </li>
                        <li>
                          <div href="/profile/change-password" onClick={() => setChangePassword(true)}>Change Password</div>
                        </li>
                      </ul>
                    </div>
                  </div>
              }
            </div>
            <div style={{ background: 'rgb(255, 255, 255)', padding: '32px' }}>
              {
                editProfile ?
                  <>
                    <div style={{ marginBottom: '24px' }}>
                      <div style={{ fontFamily: 'Roboto, sans-serif', lineHeight: '16px', fontSize: '14px', fontWeight: 'normal', marginBottom: '4px', color: 'rgb(137, 138, 154)' }}>
                        Name
                      </div>
                      <input onChange={(e) => setName(e.target.value)} value={name} style={{ width: '100%', color: 'rgb(69, 70, 85)', border: '1px solid rgb(192, 192, 202)', fontSize: '14px', lineHeight: '24px', fontFamily: 'Roboto, sans-serif', padding: '4px 8px' }} />
                    </div>
                    <div style={{ marginBottom: '24px' }}>
                      <div style={{ fontFamily: 'Roboto, sans-serif', lineHeight: '16px', fontSize: '14px', fontWeight: 'normal', marginBottom: '4px', color: 'rgb(137, 138, 154)' }}>
                        Email
                      </div>
                      <input disabled value={email} style={{ width: '100%', color: 'rgb(69, 70, 85)', border: '1px solid rgb(192, 192, 202)', fontSize: '14px', lineHeight: '24px', fontFamily: 'Roboto, sans-serif', padding: '4px 8px' }} />
                    </div>
                    <div style={{ marginBottom: '24px' }}>
                      <div style={{ fontFamily: 'Roboto, sans-serif', lineHeight: '16px', fontSize: '14px', fontWeight: 'normal', marginBottom: '4px', color: 'rgb(137, 138, 154)' }}>
                        Address
                      </div>
                      <input onChange={(e) => setAddress(e.target.value)} value={address} style={{ width: '100%', color: 'rgb(69, 70, 85)', border: '1px solid rgb(192, 192, 202)', fontSize: '14px', lineHeight: '24px', fontFamily: 'Roboto, sans-serif', padding: '4px 8px' }} />
                    </div>
                    <div style={{ marginBottom: '24px' }}>
                      <div style={{ fontFamily: 'Roboto, sans-serif', lineHeight: '16px', fontSize: '14px', fontWeight: 'normal', marginBottom: '4px', color: 'rgb(137, 138, 154)' }}>
                        Country
                      </div>
                      <input onChange={(e) => setCountry(e.target.value)} value={country} style={{ width: '100%', color: 'rgb(69, 70, 85)', border: '1px solid rgb(192, 192, 202)', fontSize: '14px', lineHeight: '24px', fontFamily: 'Roboto, sans-serif', padding: '4px 8px' }} />
                    </div>
                    <div style={{ marginBottom: '24px' }}>
                      <div style={{ fontFamily: 'Roboto, sans-serif', lineHeight: '16px', fontSize: '14px', fontWeight: 'normal', marginBottom: '4px', color: 'rgb(137, 138, 154)' }}>
                        Postal Code
                      </div>
                      <input onChange={(e) => setPostalCode(e.target.value)} value={postalCode} style={{ width: '100%', color: 'rgb(69, 70, 85)', border: '1px solid rgb(192, 192, 202)', fontSize: '14px', lineHeight: '24px', fontFamily: 'Roboto, sans-serif', padding: '4px 8px' }} />
                    </div>
                    <div style={{ marginBottom: '24px', display: "flex", justifyContent: "center" }}>
                      <button style={{ cursor: "pointer", fontSize: '14px', fontFamily: 'Roboto, sans-serif', border: '1px solid transparent', backgroundColor: 'rgb(66, 104, 246)', color: 'rgb(255, 255, 255)', padding: '8px 48px', lineHeight: '24px' }} onClick={updateProfile}>Save</button>
                    </div>
                  </>
                  :
                  <>
                    <div style={{ marginBottom: '24px' }}>
                      <div style={{ fontFamily: 'Roboto, sans-serif', lineHeight: '16px', fontSize: '14px', fontWeight: 'normal', marginBottom: '4px', color: 'rgb(137, 138, 154)' }}>
                        Name
                      </div>
                      <div>{name}</div>
                    </div>
                    <div style={{ marginBottom: '24px' }}>
                      <div style={{ fontFamily: 'Roboto, sans-serif', lineHeight: '16px', fontSize: '14px', fontWeight: 'normal', marginBottom: '4px', color: 'rgb(137, 138, 154)' }}>
                        Email
                      </div>
                      <div>{email}</div>
                    </div>
                    <div style={{ marginBottom: '24px' }}>
                      <div style={{ fontFamily: 'Roboto, sans-serif', lineHeight: '16px', fontSize: '14px', fontWeight: 'normal', marginBottom: '4px', color: 'rgb(137, 138, 154)' }}>
                        Address
                      </div>
                      <div>{address}</div>
                    </div>
                    <div style={{ marginBottom: '24px' }}>
                      <div style={{ fontFamily: 'Roboto, sans-serif', lineHeight: '16px', fontSize: '14px', fontWeight: 'normal', marginBottom: '4px', color: 'rgb(137, 138, 154)' }}>
                        Country
                      </div>
                      <div>{country}</div>
                    </div>
                    <div style={{ marginBottom: '24px' }}>
                      <div style={{ fontFamily: 'Roboto, sans-serif', lineHeight: '16px', fontSize: '14px', fontWeight: 'normal', marginBottom: '4px', color: 'rgb(137, 138, 154)' }}>
                        Postal Code
                      </div>
                      <div>{postalCode}</div>
                    </div>
                  </>
              }
            </div>
          </div>
          {changePassword ? <ChangePassword onChange={setChangePassword} /> : null}
        </div>
        :
        <ErrorPage />
      }
    </>
  )
}

export default Profile
