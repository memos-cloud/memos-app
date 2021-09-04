import { format, parseISO } from 'date-fns'
import React from 'react'
import { Dimensions, StyleSheet, TouchableOpacity, View } from 'react-native'
import { useStoreActions, useStoreState } from '../@types/typedHooks'
import Container from '../components/Container'
import { LogoutIcon } from '../components/LogoutIcon'
import { MyText } from '../components/MyText'
import { SmoothFastImage } from '../components/SmoothFastImage'

const profilePicSize = 150
const progressBarWidth = Dimensions.get('screen').width - 40

export const ProfileScreen = () => {
  const profileData = useStoreState((state) => state.profile)

  const profilePic = profileData.profilePic.replace(
    /=s.*?-c/,
    `=s${profilePicSize * 3}-c`
  )
  const usagePercentage = Math.round((profileData.usage / 250) * 100)

  const Logout = useStoreActions((state) => state.Logout)

  const colors = useStoreState((state) => state.theme)

  return (
    <Container customStyles={{ paddingVertical: 25, paddingHorizontal: 20 }}>
      <View style={styles.info}>
        <SmoothFastImage
          resizeMode='contain'
          source={{ uri: profilePic }}
          style={[
            styles.profilePic,
            {
              borderColor: colors.borderColor,
            },
          ]}
        />
        <View style={[styles.info, { marginTop: 10 }]}>
          <MyText size='lg'>{profileData.name}</MyText>
          <MyText
            size='xs'
            customStyles={{ color: 'rgba(255, 255, 255, 0.55)' }}
          >
            Joined on {format(parseISO(profileData.createdAt), 'LLL d, yyyy')}
          </MyText>
        </View>
        <View style={styles.email}>
          <MyText size='md' customStyles={{ marginBottom: 2 }}>
            Email:
          </MyText>
          <MyText
            size='xs'
            customStyles={{ color: 'rgba(255, 255, 255, 0.55)' }}
          >
            {profileData.email}
          </MyText>
        </View>
        <View style={styles.usage}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <MyText size='md' customStyles={{ marginBottom: 8 }}>
              Usage:
            </MyText>
            <View
              style={[
                styles.badge,
                {
                  backgroundColor: colors.primary,
                },
              ]}
            >
              <MyText
                size='2xs'
                customStyles={{
                  transform: [{ translateY: 0.35 }],
                }}
              >
                {usagePercentage}%
              </MyText>
            </View>
          </View>
          <View
            style={[
              styles.progress,
              {
                backgroundColor: colors.primary,
              },
            ]}
          >
            <View
              style={[
                styles.progressGrey,
                {
                  backgroundColor: colors.secondary,
                  transform: [
                    {
                      translateX: Math.round(
                        (profileData.usage / 250) * progressBarWidth
                      ),
                    },
                  ],
                },
              ]}
            ></View>
          </View>
        </View>
      </View>
      <View style={styles.logout}>
        <TouchableOpacity
          onPress={() => Logout()}
          activeOpacity={colors.activeOpacity}
          style={styles.logoutContainer}
        >
          <LogoutIcon size={18} color={colors.primary} />
          <MyText
            size='md'
            customStyles={{
              color: colors.primary,
              marginLeft: 8,
              transform: [{ translateY: 1 }],
            }}
          >
            Logout
          </MyText>
        </TouchableOpacity>
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  info: {
    alignItems: 'center',
  },
  email: {
    width: '100%',
    marginTop: 25,
  },
  usage: {
    width: '100%',
    marginTop: 18,
  },
  profilePic: {
    width: profilePicSize,
    height: profilePicSize,
    borderRadius: 16,
    borderWidth: 3,
  },
  progressGrey: {
    width: '100%',
    height: 30,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progress: {
    width: '100%',
    height: 25,
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#181818',
  },
  badge: {
    marginLeft: 10,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 9,
    paddingVertical: 1.5,
    transform: [{ translateY: -5 }],
    borderRadius: 4,
  },
  logout: {
    flex: 1,
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  logoutContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
