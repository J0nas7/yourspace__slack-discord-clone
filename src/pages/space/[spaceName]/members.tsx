// External
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faGavel, faStar, faKey, faCheck } from '@fortawesome/free-solid-svg-icons'

// Internal
import { Block, Text, Heading, Field, Profile as ProfileCard } from '@/components'
import { ProfileDTO, SpaceDTO } from '@/types'
import styles from '@/core-ui/styles/modules/SpaceSettings.module.scss'
import { useSpaces } from '@/hooks'
import {
  useTypedSelector,
  selectTheSpace,
  selectMembersList
} from '@/redux'

export default function spaceMembers() {
  // Hooks
  const { urlSpaceName, getTheSpace, membersList } = useSpaces()

  // Internal variables
  type moderatorsAndAboveObject = { [key: string]: ProfileDTO[] }
  const [settingsToRender, setSettingsToRender] = useState<SpaceDTO>()
  const [moderatorsAndAbove, setModeratorsAndAbove] = useState<moderatorsAndAboveObject>({
    'moderator': [],
    'administrator': [],
    'owner': [],
  })
  const Checkmark = <FontAwesomeIcon icon={faCheck} className={styles["role-item-rule-check"]} />

  // Redux
  const theSpace = useTypedSelector(selectTheSpace)

  // Methods
  const filterModeratorsAndAbove = (role: string) => {
    if (membersList) return membersList.filter((member: ProfileDTO, i) => member.Member_Role == role)
  }

  useEffect(() => {
    if (membersList) {
      const moderators: ProfileDTO[] = filterModeratorsAndAbove("MODERATOR")!
      const admins: ProfileDTO[] = filterModeratorsAndAbove("ADMIN")!
      const owner: ProfileDTO[] = filterModeratorsAndAbove("OWNER")!
      setModeratorsAndAbove({
        'moderator': moderators,
        'administrator': admins,
        'owner': owner,
      })
    }
  }, [membersList])

  useEffect(() => {
    setSettingsToRender(theSpace)
  }, [theSpace])

  useEffect(() => {
    if (urlSpaceName) getTheSpace()
  }, [])

  return (
    <Block className="other-pages-wrapper">
      <Block className={"other-pages-inner " + styles["space-settings"]}>
        <Heading title={"Space members: " + settingsToRender?.Space_Name} />
        <Block className={styles["space-settings-section"] + " " + styles["space-members-list"]}>
          <Heading variant="h2" title="Space members" />
          {membersList ? (
            <>
              {membersList && membersList.map((member, i) =>
                <ProfileCard variant="space-settings-member" className={styles["space-member"]} profile={member} key={i} />
              )}
            </>
          ) : (
            <Block>Not any members</Block>
          )}
          <Block className="clear-both"></Block>
        </Block>
        <Block className={styles["space-settings-section"] + " " + styles["space-member-roles"]}>
          <Heading variant="h2" title="Member roles" />
          <Block className={styles["member-roles-item"]}>
            <Text variant="span" className={styles["role-item-title"]}>
              <Text variant="span">Guest</Text>
              <FontAwesomeIcon icon={faUser} className={styles["role-item-title-icon"]} />
            </Text>
            <Text variant="span" className={styles["role-item-rule"]}>
              {Checkmark}
              Can join the conversation
            </Text>
            <Text variant="span" className={styles["role-item-rule"]}>
              {Checkmark}
              Can DM other members
            </Text>
            <Text variant="span" className={styles["role-item-rule"]}>
              {Checkmark}
              Can edit own messages
            </Text>
          </Block>
          <Block className={styles["member-roles-item"]}>
            <Text variant="span" className={styles["role-item-title"]}>
              <Text variant="span">Moderator</Text>
              <FontAwesomeIcon icon={faGavel} className={styles["role-item-title-icon"]} />
            </Text>
            <Text variant="span" className={styles["role-item-rule"]}>
              {Checkmark}
              Can delete messages in channels
            </Text>
            <Text variant="span" className={styles["role-item-rule"]}>
              {Checkmark}
              Can kick and ban from the space
            </Text>
          </Block>
          <Block className={styles["member-roles-item"]}>
            <Text variant="span" className={styles["role-item-title"]}>
              <Text variant="span">Administrator</Text>
              <FontAwesomeIcon icon={faStar} className={styles["role-item-title-icon"]} />
            </Text>
            <Text variant="span" className={styles["role-item-rule"]}>
              {Checkmark}
              Can change most space-settings
            </Text>
            <Text variant="span" className={styles["role-item-rule"]}>
              {Checkmark}
              Can remove members
            </Text>
          </Block>
          <Block className={styles["member-roles-item"]}>
            <Text variant="span" className={styles["role-item-title"]}>
              <Text variant="span">Owner</Text>
              <FontAwesomeIcon icon={faKey} className={styles["role-item-title-icon"]} />
            </Text>
            <Text variant="span" className={styles["role-item-rule"]}>
              {Checkmark}
              Can change the space name
            </Text>
            <Text variant="span" className={styles["role-item-rule"]}>
              {Checkmark}
              Can delete the space
            </Text>
          </Block>
          <Heading variant="h2" title="Moderators and above" />
          {Object.entries(moderatorsAndAbove).map(([role, content]) =>
            <Block className={styles["moderators-and-above"]} key={role}>
              <Text variant="span" className={styles["role-members-title"]}>
                <strong>{role.charAt(0).toUpperCase() + role.slice(1)}</strong>(s)
              </Text>
              {content.length ? (
                <>
                  {content && content.map((member, i) =>
                    <ProfileCard variant="space-settings-member" className={styles["space-member"]} profile={member} key={i} />
                  )}
                </>
              ) : (
                <Block className={styles["no-members"]}>Not any {role}(s)</Block>
              )}
            </Block>
          )}
          <Block className="clear-both"></Block>
        </Block>
      </Block>
    </Block>
  )
}