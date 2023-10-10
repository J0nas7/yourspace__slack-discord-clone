import { prisma } from '@/data/prisma_db'

export const getOrCreateDirectConversation = async (memberOneID: string, memberTwoID: string) => {
    let conversation = await findDirectConversation(memberOneID, memberTwoID) || await findDirectConversation(memberTwoID, memberOneID)

    if (!conversation) conversation = await createNewDirectConversation(memberOneID, memberTwoID)

    return conversation
}

const findDirectConversation = async (memberOneID: string, memberTwoID: string) => {
    try {
        return await prisma.space_Conversation.findFirst({
            where: {
                AND: [
                    { Conversation_MemberOne_ID: memberOneID },
                    { Conversation_MemberTwo_ID: memberTwoID }
                ]
            },
            include: {
                Conversation_MemberOne: {
                    include: {
                        Member_Profile: true
                    }
                },
                Conversation_MemberTwo: {
                    include: {
                        Member_Profile: true
                    }
                }
            }
        })
    } catch (error) {
        return null
    }
}

const createNewDirectConversation = async (memberOneID: any, memberTwoID: any) => {
    try {
        return await prisma.space_Conversation.create({
            data: {
                Conversation_MemberOne_ID: memberOneID,
                Conversation_MemberTwo_ID: memberTwoID
            },
            include: {
                Conversation_MemberOne: {
                    include: {
                        Member_Profile: true,
                    }
                },
                Conversation_MemberTwo: {
                    include: {
                        Member_Profile: true,
                    }
                }
            }
        })
    } catch {
        return null;
    }
}