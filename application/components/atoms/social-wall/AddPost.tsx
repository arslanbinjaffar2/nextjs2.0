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
import Icoimage from 'application/assets/icons/small/Icoimage';
import Icovideo from 'application/assets/icons/small/Icovideo';


import in_array from "in_array";


const AddPost = () => {

    const { _env } = UseEnvService();
    const { AddSocialWallPost ,labels } = UseSocialWallService();
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
        <Box borderWidth="0" borderColor="primary.bdBox" overflow="hidden" position="relative" w="100%" bg="primary.box" rounded="10" mb="3">
            <HStack px="4" py="3" pr="12" space="3" alignItems="flex-start">
                <Avatar
                    size="sm"
                    source={{
                        uri: `${_env.eventcenter_base_url}/assets/attendees/${response?.data?.user?.image}`
                    }}
                >
                    { response?.data?.user?.first_name && response?.data?.user?.last_name ? response?.data?.user?.first_name?.substring(0,1) + response?.data?.user?.last_name?.substring(0,1) : response?.data?.user?.first_name?.substring(0,1)}
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
                    borderWidth="0" fontSize="md" placeholder={labels?.WHAT_IS_ON_YOUR_MIND} autoCompleteType={undefined} />
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
                        nativeID='zindex-9'
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
            <HStack px={3} pb={3} borderTopWidth="0" borderTopColor="primary.bdBox" space="0" alignItems="center">
                <Center>
                    <HStack w="100%" space="1" alignItems="center">
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
														p={0}
                            rounded="0"
                            bg={''}
                            _hover={{ bg: '', _icon: {color: 'primary.100'} }}
                            variant="unstyled"
                            icon={<Icoimage width={24} />}
                            onPress={()=>{
                                if(inputImageRef.current){
                                    inputImageRef.current.click();
                                }
                            }}
                        />
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
														p={0}
                            bg={''}
                            variant="unstyled"
                            _hover={{ bg: '', _icon: {color: 'primary.100'} }}
                            icon={<Icovideo width={28} />}
                            onPress={()=>{
                                if(inputVideoRef.current){
                                    inputVideoRef.current.click();
                                }
                            }}
                        />
                    </HStack>
                </Center>
								<Spacer />
                <Center borderLeftWidth="0" borderLeftColor="primary.bdBox">
                    <Button
                        w="100%"
												width={130}
												rounded={'8'}
                        py="2"
                        _text={{ fontWeight: 600, color: 'primary.hovercolor' }}
                        colorScheme="primary"
                        onPress={() => {
                           createPost();
                        }}
                    >
                        {labels?.SOCIAL_WALL_POST}
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