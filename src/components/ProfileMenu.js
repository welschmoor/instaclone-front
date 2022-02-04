import { useMutation, useReactiveVar } from "@apollo/client"
import { useUserHook } from "../graphql/useUserHook"
import { Link as LinkNS } from "react-router-dom"
import { EDIT_AVATAR, ME } from "../graphql/queries"
import { loggedInVar } from "../graphql/apollo"
import { useCallback, useState } from "react"
import useScroll from '../hooks/useScroll'
import ThemeSwitch from "./ThemeSwitch"

//styles
import { BlueBTN as BlueBTNNS } from '../STYLES/styleForm'
import { IoLogOutOutline } from "react-icons/io5"
import { useDropzone } from "react-dropzone"
import { CgArrowUpO } from "react-icons/cg"
import styled from "styled-components"


const ProfileMenu = ({ visible, setDarkMode, setMenuOpenB }) => {
  const { y } = useScroll()
  const loggedInBool = useReactiveVar(loggedInVar)
  const { data: userData } = useUserHook()

  const [fileError, setFileError] = useState(null)
  const [uploadFile, { loading: uploadLoading }] = useMutation(EDIT_AVATAR)
  const onDrop = useCallback(
    async (acceptedFiles) => {
      if (uploadLoading) { return }
      const file = acceptedFiles[0];
      try {
        await uploadFile({
          variables: { avatar: file },
          refetchQueries: [{ query: ME }]
        });
        setMenuOpenB(false)
      } catch (error) {
        setFileError(error.message)
      }
    }, [uploadFile]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const logout = () => {
    loggedInVar(false)
    localStorage.removeItem("instapoundtoken")
    localStorage.clear()
  }

  const darkModeHandler = () => {
    setDarkMode(p => {
      localStorage.setItem("instapounddarkmode", p)
      return !p
    })
  }

  return (
    <MenuWrapper visible={visible} y={y}>
      <WelcomeText> Hello, <Bold>{userData?.me?.username}</Bold>! </WelcomeText>
      <Link to={`/profile/${userData?.me?.username}`} onClick={() => setMenuOpenB(false)} >See your profile</Link>

      <Text>Change the color mode:</Text>
      <ThemeSwitch setDarkMode={darkModeHandler} />

      <Space />
      <Text>Upload a different avatar:</Text>
      <UploadAvatarArea {...getRootProps()} className={`dropzone ${isDragActive && 'isActive'}`}>
        <UploadIcon />
        <FileInput {...getInputProps()} disabled={uploadLoading} />
        {isDragActive ? (
          <></>
        ) : (
          <></>
        )}

      </UploadAvatarArea>

      <Space />
      {loggedInBool && <BlueBTN onClick={() => logout()} >logout<LogOutIcon /></BlueBTN>}
    </MenuWrapper>
  )
}

const MenuWrapper = styled.div`
  min-width: 240px;
  transition: ${p => p.theme.TIMES.zero2};
  position: fixed;
  padding: 10px;
  padding-top: 40px;

  /* visible must be one pixel less than the height of navbar */
  top: ${p => p.visible
    ? p.y > 20 ? "45px" : "59px"
    : p.y > 20 ? "-260px" : "-250px"

  };  
  right: -1px;
  background-color: ${p => p.theme.BG.col1};
  z-index: 12;
  border: 1px solid ${p => p.theme.BORCOL1};
  box-shadow: 0px 0px 6px 6px rgba(0, 0, 0, 0.05);
`

const BlueBTN = styled(BlueBTNNS)`
  background-color: ${p => p.theme.blueBTN1};
  transition: 0.13s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    font-size: 0rem;
  }
`

const WelcomeText = styled.div`
  font-size: 0.9rem;
  color: #414141;
  font-style: italic;

`
const Bold = styled.div`
  font-weight: 600;
  display: inline;
`

const Text = styled.div`
  font-size: 0.8rem;
  color: #414141;
  margin-bottom: 5px;
`

const Link = styled(LinkNS)`
  text-decoration: none;
  font-size: 0.6rem;
  color: #646464;
  display: block;
  margin-bottom: 40px;
  padding: 1px 0;

  &:hover {
    text-decoration: underline;
  }
`

const Space = styled.div`
  margin: 20px 0;
`

const UploadIcon = styled(CgArrowUpO)`
  font-size: 1.4rem;
  color: #414141;
  cursor: pointer;
`

const UploadAvatarArea = styled.div`
  
`

const FileInput = styled.input`
  display: none;
`

const LogOutIcon = styled(IoLogOutOutline)`
  transition: 0.13s;
  transform: translateX(10px);
  color: ${p => p.theme.logOutIconCol};
  font-size: 0rem;
  ${BlueBTN}:hover & {
    transform: translateX(0px);
    font-size: 1.2rem;
  }
`

export default ProfileMenu