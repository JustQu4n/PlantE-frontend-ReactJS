import React from 'react'
import './sidebar.css'
import logo from '../../../Assets/logo.png'
import { IoMdSpeedometer } from 'react-icons/io'
import { MdDeliveryDining, MdOutlineExplore, MdOutlinePermContactCalendar } from 'react-icons/md'
import { BsTrophy, BsCreditCard2Front, BsQuestionCircle } from 'react-icons/bs'
import { AiOutlinePieChart } from 'react-icons/ai'
import { BiTrendingUp, BiLogOutCircle } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Sidebar = () => {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    // Clear all authentication data
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    
    // Show logout notification
    toast.success('Logged out successfully');
    
    // Redirect to login page
    navigate('/');
  };
  return (
    <div className='sideBar grid'>

      <div className="logoDiv flex">
        <img src={logo} alt="Logo" />
        <h2>Planti.</h2>
      </div>

      <div className="menuDiv">
        <h3 className="divTitle">
          QUICK MENU
        </h3>
        <ul className="menuLists grid">

          <li className="listItem">
            <a href="/dashboard" className="menuLink flex">
              <IoMdSpeedometer className="icon" />
              <span className="smallText">
                Dashboard
              </span>
            </a>
          </li>

          <li className="listItem">
            <a href="/list" className="menuLink flex">
              <BsTrophy className="icon" />
              <span className="smallText">
                List Products
              </span>
            </a>
          </li>

          <li className="listItem">
            <a href="#" className="menuLink flex">
              <MdDeliveryDining className="icon" />
              <span className="smallText">
                My Orders
              </span>
            </a>
          </li>

          <li className="listItem">
            <a href="#" className="menuLink flex">
              <MdOutlineExplore className="icon" />
              <span className="smallText">
                Explore
              </span>
            </a>
          </li>

          
        </ul>
      </div>


      <div className="settingsDiv">
        <h3 className="divTitle">
          SETTINGS
        </h3>
        <ul className="menuLists grid">

          <li className="listItem">
            <a href="#" className="menuLink flex">
              <AiOutlinePieChart className="icon" />
              <span className="smallText">
                Charts
              </span>
            </a>
          </li>

          <li className="listItem">
            <a href="#" className="menuLink flex">
              <BiTrendingUp className="icon" />
              <span className="smallText">
                Trends
              </span>
            </a>
          </li>

          <li className="listItem">
            <a href="#" className="menuLink flex">
              <MdOutlinePermContactCalendar className="icon" />
              <span className="smallText">
                Contact
              </span>
            </a>
          </li>

          <li className="listItem">
            <a href="#" className="menuLink flex">
              <BsCreditCard2Front className="icon" />
              <span className="smallText">
                Billing
              </span>
            </a>
          </li>

          <li className="listItem">
            <button onClick={handleLogout} className="menuLink flex" style={{ background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}>
              <BiLogOutCircle className="icon" />
              <span className="smallText">
                Log Out
              </span>
            </button>
          </li>
        </ul>
      </div>

      <div className="sideBarCard">
        <BsQuestionCircle className="icon" />
        <div className="cardContent">
          <div className="circle1"></div>
          <div className="circle2"></div>

          <h3>Help Center</h3>
          <p>Having trouble in Planti, please contact us from for more questions.</p>
          <button className="btn">Go to help center</button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar