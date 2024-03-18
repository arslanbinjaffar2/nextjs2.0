import React, { useState } from 'react'
import { Box, Center, Avatar, HStack, IconButton, Button, Divider, TextArea, Icon, Text, Image, Spacer, Input, Alert } from 'native-base'
import IcoLike from 'application/assets/icons/Icolike'
import IcoSmiley from 'application/assets/icons/Icosmiley';
import Ionicons from '@expo/vector-icons/Ionicons';
import { NewPost } from 'application/models/socialWall/SocialWall'
import LoadImage from 'application/components/atoms/LoadImage';
import UseSocialWallService from 'application/store/services/UseSocialWallService';
import UseLoadingService from 'application/store/services/UseLoadingService';
import UseAuthService from 'application/store/services/UseAuthService';
import UseEnvService from 'application/store/services/UseEnvService';
import WebLoading from 'application/components/atoms/WebLoading';


import in_array from "in_array";


const AddPost = () => {

    const { _env } = UseEnvService();
    const { AddSocialWallPost } = UseSocialWallService();
    const { processing } = UseLoadingService();
    const { response } = UseAuthService();
    const [postData, setpostData] = React.useState<NewPost>({
            file: null,
            content: '',
            type: null,
            file_url: '',
        });

    function createPost() {
        if(postData.content === '' && postData.file === null){
            alert('Please write something or select image/video to post');
            return false;
        }
        AddSocialWallPost({...postData});

        setpostData({
            file: null,
            content: '',
            type: null,
            file_url: '',
        });

        if(inputImageRef.current){
            inputImageRef.current.value = '';
        }
        if(inputVideoRef.current){
            inputVideoRef.current.value = '';
        }
        if(inputContentRef.current){
            inputContentRef.current.value = '';
        }

    }

    function handleImageSelected(e: any) {
        if (e?.target?.files! && e?.target?.files?.length > 0) {
            const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
            if (!allowedExtensions.exec(e.target.files[0].name)) {
                alert('Invalid file type');
                return false;
            }
            setpostData({
                ...postData,
                file: e.target.files[0],
                file_url: URL.createObjectURL(e.target.files[0]),
                type: 'image'
            }); 
        }

    }

    function handleVideoSelected(e: any) {
        if (e?.target?.files! && e?.target?.files?.length > 0) {
            const allowedExtensions = /(\.mp4|\.avi|\.mov|\.wmv)$/i;
            if (!allowedExtensions.exec(e.target.files[0].name)) {
                alert('Invalid file type');
                return false;
            }
            setpostData({
                ...postData,
                file: e.target.files[0],
                file_url: URL.createObjectURL(e.target.files[0]),
                type: 'video'
            });
        }else{
        }
    }

    function removeFile() { 
        setpostData({
            ...postData,
            file: null,
            file_url: '',
            type: null
        });

        // clear input file
        if(inputImageRef.current){
            inputImageRef.current.value = '';
        }
        if(inputVideoRef.current){
            inputVideoRef.current.value = '';
        }
    }

    const inputImageRef = React.useRef<HTMLInputElement | null>(null);
    const inputVideoRef = React.useRef<HTMLInputElement | null>(null);
    const inputContentRef = React.useRef<HTMLInputElement | null>(null);

    return (
			<>
        <Box borderWidth="1" borderColor="primary.bdBox" overflow="hidden" position="relative" w="100%" bg="primary.box" rounded="10" mb="3">
            {/* <IconButton
                w="30px"
                h="30px"
                p="1"
                position="absolute"
                right="20px"
                top="15px"
                zIndex="99"
                rounded="100%"
                variant="unstyled"
                icon={<IcoSmiley width="20px" height="20px" />}
                onPress={() => {
                    console.log('hello')
                }}
            /> */}
            <HStack px="4" py="3" pr="12" space="3" alignItems="flex-start">
                <Avatar
                    size="sm"
                    source={{
                        uri: `${_env.eventcenter_base_url}/assets/attendees/${response?.data?.user?.image}`
                    }}
                >
                    SS
                </Avatar>
                <TextArea
                    onChange={(e) => {
                        setpostData({
                            ...postData,
                            content: e.nativeEvent.text,
                        });
                    }}
                    ref={inputContentRef}
                    p="0"
                    pt="1"
                    h="80px"
                    w="calc(100% - 44px)"
                    overflow="auto"
                    focusOutlineColor="transparent"
                    _focus={{ bg: 'transparent' }}
                    borderWidth="0" fontSize="md" placeholder="What's on your mind?" autoCompleteType={undefined} />
            </HStack>
            {/* show only if file is image */}
            {postData.type === 'image' && postData.file_url !== '' && (
                <Box rounded={8} position={'relative'} px={4} mb={4}  w="100%"  overflow="hidden">
                    {/* add remove file button */}
                    <IconButton
                        w="24px"
                        h="24px"
                        p="1"
                        position="absolute"
                        right="25px"
                        top="10px"
                        zIndex="99"
												nativeID='zindex-9'
                        rounded="100%"
                        variant="solid"
                        bg={'white'}
                        icon={<Icon size="xl" as={Ionicons} name="ios-close-outline" color="black" />}
                        onPress={() => {
                            removeFile()
                        }}
                    />
										<HStack w={'100%'}  space="3" alignItems="center" justifyContent={'center'}>
											<LoadImage
                        w="auto"
                        h="auto"
                        path={postData?.file_url !== '' ? postData?.file_url :''}
                    />
										</HStack>
										
                    
                </Box>
            )}
            {/* show only if file is video */}
            {postData.type === 'video' && postData.file_url !== '' && (
                <Box rounded={8} position={'relative'} px={4} mb={4}  w="100%"  overflow="hidden">
                    {/* add remove video buttton before the video element*/}
                    <IconButton
                        w="24px"
                        h="24px"
                        p="1"
                        position="absolute"
                        right="25px"
                        top="10px"
                        zIndex="99"
                        rounded="100%"
                        variant="solid"
                        bg={'white'}
                        icon={<Icon size="xl" as={Ionicons} name="ios-close-outline" color="black" />}
                        onPress={() => {
                            removeFile()
                        }}
                    />
                    
                    <video
                        width="100%"
                        height="200px"
                        controls
                        src={postData?.file_url !== '' ? postData?.file_url : ''}
                    />
                </Box>
            )}
            <HStack borderTopWidth="1" borderTopColor="primary.bdBox" space="0" alignItems="center">
                <Center bg="primary.box" w="65%">
                    <HStack w="100%" space="0" alignItems="center">
                    <input 
                        width="100%"
                            height="50px"
                            type='file'
                            style={{display:'none'}}
                            onChange={(e) => {
                                handleImageSelected(e)
                            }}
                            ref={inputImageRef}
                        />
                        <IconButton
                            w="50%"
                            rounded="0"
                            bg={'primary.box'}
                            _hover={{ bg: 'primary.secondary' }}
                            variant="unstyled"
                            icon={<Icon size="xl" as={Ionicons} name="ios-image-outline" color="primary.text" />}
                            onPress={()=>{
                                if(inputImageRef.current){
                                    inputImageRef.current.click();
                                }
                            }}
                        />
                        <Divider w="1px" h="10" bg="primary.text" />
                        <input 
                            width="100%"
                            height="50px"
                            type='file'
                            style={{display:'none'}}
                            onChange={(e) => {
                                handleVideoSelected(e)
                            }}
                            ref={inputVideoRef}
                        />
                        <IconButton
                            w="50%"
                            rounded="0"
                            bg={'primary.box'}
                            variant="unstyled"
                            _hover={{ bg: 'primary.secondary' }}
                            icon={<Icon size="xl" as={Ionicons} name="ios-videocam-outline" color="primary.text" />}
                            onPress={()=>{
                                if(inputVideoRef.current){
                                    inputVideoRef.current.click();
                                }
                            }}
                        />
                    </HStack>
                </Center>
                <Center borderLeftWidth="1" borderLeftColor="primary.bdBox" w="35%">
                    <Button
                        w="100%"
                        rounded="0"
                        py="3"
                        _text={{ fontWeight: 600 }}
                        colorScheme="primary"
                        onPress={() => {
                           createPost();
                        }}
                    >
                        POST
                    </Button>
                </Center>
            </HStack>
        </Box>
            {(in_array('social_wall_save_post', processing)) && (
							<Box justifyContent={'center'} alignItems={'center'} mb={3}>
                <WebLoading />
							</Box>
            )}
			</>
    )

}

export default AddPost