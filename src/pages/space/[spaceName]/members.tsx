// External
import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faGavel, faStar, faKey, faCheck } from '@fortawesome/free-solid-svg-icons'
import { SelectChangeEvent } from '@mui/material'

// Internal
import { Block, Text, Heading, SelectField, Profile as ProfileCard, AccessSpace } from '@/components'
import { ProfileDTO } from '@/types'
import styles from '@/core-ui/styles/modules/SpaceSettings.module.scss'
import { useSpaces } from '@/hooks'
import {
  useTypedSelector,
  selectTheSpace,
  selectMembersList
} from '@/redux'

export default function spaceMembers() {
  // Hooks
  const { theSpace, membersList, readSpace, filterModeratorsAndAbove, updateConfirmRole, deleteThisMember } = useSpaces()

  // Internal variables
  type moderatorsAndAboveObject = { [key: string]: ProfileDTO[] }
  const [moderatorsAndAbove, setModeratorsAndAbove] = useState<moderatorsAndAboveObject>({
    'moderator': [],
    'admin': []
  })
  const Checkmark = <FontAwesomeIcon icon={faCheck} className={styles["rule-check"]} />
  const [theOwner, setTheOwner] = useState<ProfileDTO>()
  const [privacyOption, setPrivacyOption] = useState<string>('')
  const privacyItems = [
    { "value": "public", "title": "Public" },
    { "value": "private", "title": "Private" },
    { "value": "hidden", "title": "Hidden" },
    { "value": "closed", "title": "Closed" },
  ]

  // Methods
  const handlePrivacyOption = (event: SelectChangeEvent) => setPrivacyOption(event.target.value)

  useEffect(() => {
    if (membersList) {
      const moderators: ProfileDTO[] = filterModeratorsAndAbove("MODERATOR")!
      const admins: ProfileDTO[] = filterModeratorsAndAbove("ADMIN")!
      setModeratorsAndAbove({
        'moderator': moderators,
        'admin': admins
      })
      setTheOwner(filterModeratorsAndAbove("OWNER")![0])
    }
  }, [membersList])

  useEffect(() => {
    if (!theSpace.Space_Name) readSpace()
  }, [theSpace])

  return (
    <Block className="other-pages-wrapper">
      <Block className={"other-pages-inner " + styles["space-settings"]}>
        <AccessSpace membersList={membersList} access={4}>
          <Heading title={"Space memberships: " + theSpace?.Space_Name} />
          <Block className={"page-section " + styles["space-publicity-roles"]}>
            <Heading variant="h2" title="Space publicity roles" />
            <Block className={styles["space-public-option"]}>
              <Text variant="span" className={styles["public-option-title"]}>Public</Text>
              <Text variant="span" className={styles["public-option-rule"]}>
                {Checkmark}
                Can be found in Explorer
              </Text>
              <Text variant="span" className={styles["public-option-rule"]}>
                {Checkmark}
                Anyone can join in app
              </Text>
            </Block>
            <Block className={styles["space-public-option"]}>
              <Text variant="span" className={styles["public-option-title"]}>Private</Text>
              <Text variant="span" className={styles["public-option-rule"]}>
                {Checkmark}
                Can be found in Explorer
              </Text>
              <Text variant="span" className={styles["public-option-rule"]}>
                {Checkmark}
                Request membership can be required
              </Text>
            </Block>
            <Block className={styles["space-public-option"]}>
              <Text variant="span" className={styles["public-option-title"]}>Hidden</Text>
              <Text variant="span" className={styles["public-option-rule"]}>
                {Checkmark}
                Hidden from public
              </Text>
              <Text variant="span" className={styles["public-option-rule"]}>
                {Checkmark}
                Link to join membership can be generated
              </Text>
              <Text variant="span" className={styles["public-option-rule"]}>
                {Checkmark}
                Request membership can be required
              </Text>
            </Block>
            <Block className={styles["space-public-option"]}>
              <Text variant="span" className={styles["public-option-title"]}>Closed</Text>
              <Text variant="span" className={styles["public-option-rule"]}>
                {Checkmark}
                Hidden from public
              </Text>
              <Text variant="span" className={styles["public-option-rule"]}>
                {Checkmark}
                Closed for new members
              </Text>
            </Block>
            <Block className="clear-both" />
          </Block>
          <Block className={"page-section " + styles["space-publicity"]}>
            <Heading variant="h2" title="Privacy details" />
            <Block className={styles["space-public-setting"]}>
              <SelectField
                lbl="Privacy option"
                title="Privacy option"
                value={privacyOption}
                items={privacyItems}
                onChange={(e: any) => handlePrivacyOption}
                disabled={false}
              />
            </Block>
            <Block className="clear-both" />
          </Block>
          <Block className={"page-section " + styles["space-member-roles"]}>
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
                <Text variant="span">Admin</Text>
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
            <Block className="clear-both"></Block>
          </Block>
          <Block className={"page-section " + styles["moderators-and-above"]}>
            <Heading variant="h2" title="Moderators and above" />
            {Object.entries(moderatorsAndAbove).map(([role, content]) =>
              <Block className={styles["moderators-and-above"]} key={role}>
                <Text variant="span" className={styles["role-members-title"]}>
                  <strong>{role.charAt(0).toUpperCase() + role.slice(1)}</strong>(s)
                </Text>
                {content.length ? (
                  <>
                    {content && content.map((member, i) =>
                      <ProfileCard variant="space-settings-member" condition="member-role" className={styles["space-member"]} profile={member} key={i} hook1={deleteThisMember} hook2={updateConfirmRole} />
                    )}
                  </>
                ) : (
                  <Block className={styles["no-members"]}>Not any {role}(s)</Block>
                )}
              </Block>
            )}
            <Block className="clear-both">
              <Text variant="span" className={styles["role-members-title"]}>
                <strong>Owner:</strong>
              </Text>
              <ProfileCard variant="space-settings-member" className={styles["space-member"] + " clear-both"} profile={theOwner} />
            </Block>
            <Block className="clear-both"></Block>
          </Block>
          <Block className={"page-section " + styles["space-members-list"]}>
            <Heading variant="h2" title="Space members" />
            {membersList ? (
              <>
                {membersList && membersList.map((member, i) =>
                  <ProfileCard variant="space-settings-member" condition="membership" className={styles["space-member"]} profile={member} key={i} hook1={deleteThisMember} hook2={updateConfirmRole} />
                )}
              </>
            ) : (
              <Block>Not any members</Block>
            )}
            <Block className="clear-both"></Block>
          </Block>
          <Block className="clear-both"></Block>
        </AccessSpace>
      </Block>
    </Block>
  )
}