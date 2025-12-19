import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import LoggingPage from './pages/LoggingPage'
import SignUpPage from './pages/signup/SignUpPage'
import VerificationPage from './pages/verification/VerificationPage'
import HomePage from './pages/home-page/HomePage'
import Profile from './pages/Profile'
import ProtectRoutes from './security/protectRoutes'
import SearcResult from './pages/SearchResult'
import { useUserContext } from './context/UserContext'
import FeedSkeletonLoader from './spinners/FeedSkeletonLoader'
import Friends from './pages/friends/Friends'
import FriendRequest from './pages/friends/FriendRequest'
import FriendSuggestion from './pages/friends/FriendSuggestion'
import AllFriends from './pages/friends/AllFriends'
import Notification from './pages/Notifications'
import StoryCreatePage from './pages/Story'
import ResetNewPasswordPage from './pages/ChangePassword'
import PasswordVerificationPage from './pages/passwordVerification/PasswordVerification'
import FindAccount from './pages/FindAccount'
import Feedback from './pages/Feedback'
import AdminFeedback from './pages/ViewFeedback'
function App() {

const {loading} = useUserContext();

  return (
    <>

      <Routes>
        <Route path='/' element={<Navigate to='/logging' replace />} />

        <Route path='/register' element={<SignUpPage  />} />
        <Route path='/verify' element={<VerificationPage />} />
        <Route path='/logging' element={<LoggingPage />} />
         <Route path='/password/verify' element={<PasswordVerificationPage />} />
      <Route path='/password/find-account' element={<FindAccount />} />
        <Route path='/password/change' element={<ResetNewPasswordPage />} 
          />
  
    
        <Route path='/home' element={
            <ProtectRoutes>
               {loading === true ? <FeedSkeletonLoader /> : <HomePage />}
            </ProtectRoutes>
        } />
        <Route path='/profile/:id' element={
            <ProtectRoutes>
              {loading === true ? <FeedSkeletonLoader /> : <Profile />}
          </ProtectRoutes>} /> 

          <Route path='/friends' element={
            <ProtectRoutes >
               {loading === true ? <FeedSkeletonLoader /> : <Friends />}
            </ProtectRoutes>
          } />

          <Route
            path='/friends/requests' element={
              <ProtectRoutes>
                  {loading === true ? <FeedSkeletonLoader /> : <FriendRequest />}
              </ProtectRoutes>
            }
         />

          <Route
            path='/friends/suggestions' element={
              <ProtectRoutes>
                  {loading === true ? <FeedSkeletonLoader /> : <FriendSuggestion />}
              </ProtectRoutes>
            }
         />

          <Route
            path='/friends/lists' element={
              <ProtectRoutes>
                  {loading === true ? <FeedSkeletonLoader /> : <AllFriends />}
              </ProtectRoutes>
            }
         />

         <Route
            path='/search/all' element={
              <ProtectRoutes>
                  {loading === true ? <FeedSkeletonLoader /> : <SearcResult />}
              </ProtectRoutes>
            } 
          />

           <Route
            path='/notification' element={
              <ProtectRoutes>
                  {loading === true ? <FeedSkeletonLoader /> : <Notification />}
              </ProtectRoutes>
            } 
          />
           <Route
            path='/story/create' element={
              <ProtectRoutes>
                  {loading === true ? <FeedSkeletonLoader /> : <StoryCreatePage />}
              </ProtectRoutes>
            } 
          />
           <Route
            path='/feedback' element={
              <ProtectRoutes>
                  {loading === true ? <FeedSkeletonLoader /> : <Feedback />}
              </ProtectRoutes>
            } 
          />
          <Route
            path='/feedback/view' element={
              <ProtectRoutes>
                  {loading === true ? <FeedSkeletonLoader /> : <AdminFeedback />}
              </ProtectRoutes>
            } 
          />
         
      </Routes>

    </>
  )
}

export default App
