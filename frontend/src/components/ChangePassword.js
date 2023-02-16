import { toast } from 'react-toastify';
import cookie from 'js-cookie';
import axios from '../Axios'
import "../css/Profile.css"
import React from 'react'

const ChangePassword = (props) => {
    const [currentPassword, setCurrentPassword] = React.useState('')
    const [newPassword, setNewPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')

    const handleSubmit = async (e) => {
        if (currentPassword === '' || newPassword === '' || confirmPassword === '') {
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
            return
        }
        else if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return
        }
        else {
            const { data } = await axios.post("/API/Users/UpdatePassword", { currentPassword, newPassword }, {
                headers: {
                    'authorization': cookie.getJSON("userInfo").token
                }
            });
            if (data.message === "Old password is incorrect") {
                toast.error("Old password is incorrect", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                return
            }
            else if (data.message === "Password updated successfully") {
                toast.success("Password Changed Successfully", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                props.onChange(false)
            }
            else {
                toast.error("Something went wrong", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                return
            }
            props.onChange(false)
        }
    }
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", position: "fixed", top: 0, left: 0, zIndex: 101, background: "#00000080", width: "100%", height: "100%", overflow: "auto" }}>
            <div id='update-password' style={{ padding: "24px 32px", width: "30%", background: "white", borderRadius: "10px", boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.06), 0px 4px 6px rgba(0, 0, 0, 0.1)" }}>
                <div style={{ marginBottom: "20px" }}>
                    <div style={{ fontWeight: 600, color: "#111928", marginBottom: "4px", fontSize: "30px", lineHeight: "36px" }}>Change Password</div>
                </div>
                <div style={{ marginBottom: "20px" }}>
                    <div style={{ fontWeight: 400, color: "#6B7280", marginBottom: "4px", fontSize: "16px", lineHeight: "20px" }}>Current Password</div>
                    <input value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} type="password" style={{ width: "90%", padding: "6px 18px", border: "1px solid #D1D5DB", borderRadius: "8px", fontSize: "16px", lineHeight: "24px", color: "#6B7280", fontWeight: 400, background: "#F9FAFB" }} />
                    <div style={{ fontWeight: 400, color: "#6B7280", marginBottom: "4px", fontSize: "16px", lineHeight: "20px" }}>New Password</div>
                    <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" style={{ width: "90%", padding: "6px 18px", border: "1px solid #D1D5DB", borderRadius: "8px", fontSize: "16px", lineHeight: "24px", color: "#6B7280", fontWeight: 400, background: "#F9FAFB" }} />
                    <div style={{ fontWeight: 400, color: "#6B7280", marginBottom: "4px", fontSize: "16px", lineHeight: "20px" }}>Confirm Password</div>
                    <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" style={{ width: "90%", padding: "6px 18px", border: "1px solid #D1D5DB", borderRadius: "8px", fontSize: "16px", lineHeight: "24px", color: "#6B7280", fontWeight: 400, background: "#F9FAFB" }} />
                </div>
                <div style={{ display: "flex", marginTop: "48px", gap: "12px", marginLeft: "auto", justifyContent: "end" }}>
                    <button onClick={() => { props.onChange(false) }} style={{ cursor: "pointer", background: "white", borderRadius: "12px", padding: "9px 17px 9px 17px", border: "1px solid #D1D5DB", display: "flex", alignItems: "center", justifyContent: "center", width: "100px" }}>
                        <div style={{ fontSize: "14px", lineHeight: "20px", color: "#111928", fontWeight: 600 }}>Cancel</div>
                    </button>
                    <button onClick={handleSubmit} style={{ cursor: "pointer", borderRadius: "12px", padding: "9px 17px 9px 17px", border: "1px solid #1C64F2", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#1C64F2", width: "100px" }}>
                        <div style={{ fontSize: "14px", lineHeight: "20px", color: "white", fontWeight: 600 }}>Update</div>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ChangePassword
