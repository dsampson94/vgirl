import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seeding...')

  // Clear existing data (optional - remove if you want to preserve data)
  console.log('🧹 Cleaning existing data...')
  await prisma.message.deleteMany()
  await prisma.conversation.deleteMany()
  await prisma.purchase.deleteMany()
  await prisma.transaction.deleteMany()
  await prisma.subscription.deleteMany()
  await prisma.post.deleteMany()
  await prisma.contentPack.deleteMany()
  await prisma.vGirl.deleteMany()
  await prisma.user.deleteMany()

  // Create sample users
  console.log('👥 Creating users...')
  const hashedPassword = await hash('beanY100ween11', 12)
  
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@vgirl.app',
      username: 'admin',
      password: hashedPassword,
      role: 'ADMIN',
      bio: 'Platform administrator',
      country: 'US',
      credits: 1000,
      balanceCents: 50000, // $500
    }
  })

  const creator1 = await prisma.user.create({
    data: {
      email: 'creator1@vgirl.app',
      username: 'aiartist',
      password: hashedPassword,
      role: 'CREATOR',
      bio: 'AI Art Creator specializing in virtual companions',
      country: 'UK',
      credits: 500,
      balanceCents: 25000, // $250
    }
  })

  const creator2 = await prisma.user.create({
    data: {
      email: 'creator2@vgirl.app',
      username: 'virtualdesigner',
      password: hashedPassword,
      role: 'CREATOR',
      bio: 'Expert in creating engaging AI personalities',
      country: 'CA',
      credits: 300,
      balanceCents: 15000, // $150
    }
  })

  const user1 = await prisma.user.create({
    data: {
      email: 'user1@vgirl.app',
      username: 'testuser',
      password: hashedPassword,
      role: 'USER',
      bio: 'VGirl enthusiast',
      country: 'DE',
      credits: 100,
      balanceCents: 5000, // $50
    }
  })

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@vgirl.app',
      username: 'gamer123',
      password: hashedPassword,
      role: 'USER',
      bio: 'Gaming and AI companion lover',
      country: 'JP',
      credits: 75,
      balanceCents: 3000, // $30
    }
  })

  // Create VGirls
  console.log('🤖 Creating VGirls...')
  const vgirl1 = await prisma.vGirl.create({
    data: {
      name: 'Luna',
      bio: 'A mystical AI companion with a love for stargazing and deep conversations about the universe.',
      avatarUrl: 'https://example.com/avatars/luna.jpg',
      personality: JSON.stringify({
        traits: ['mysterious', 'intelligent', 'caring', 'philosophical'],
        interests: ['astronomy', 'poetry', 'meditation', 'nature'],
        communicationStyle: 'thoughtful and poetic'
      }),
      tags: ['mystical', 'intelligent', 'astronomy', 'poetry'],
      maturity: 'SFW',
      isFeatured: true,
      ownerId: creator1.id,
    }
  })

  const vgirl2 = await prisma.vGirl.create({
    data: {
      name: 'Aria',
      bio: 'A bubbly and energetic AI companion who loves music, dancing, and making people smile.',
      avatarUrl: 'https://example.com/avatars/aria.jpg',
      personality: JSON.stringify({
        traits: ['energetic', 'cheerful', 'creative', 'supportive'],
        interests: ['music', 'dancing', 'art', 'fashion'],
        communicationStyle: 'upbeat and encouraging'
      }),
      tags: ['energetic', 'music', 'creative', 'cheerful'],
      maturity: 'SFW',
      isFeatured: true,
      ownerId: creator1.id,
    }
  })

  const vgirl3 = await prisma.vGirl.create({
    data: {
      name: 'Raven',
      bio: 'A sophisticated AI companion with expertise in technology, gaming, and strategic thinking.',
      avatarUrl: 'https://example.com/avatars/raven.jpg',
      personality: JSON.stringify({
        traits: ['analytical', 'strategic', 'witty', 'competitive'],
        interests: ['gaming', 'technology', 'chess', 'programming'],
        communicationStyle: 'direct and intelligent'
      }),
      tags: ['gamer', 'tech', 'strategic', 'competitive'],
      maturity: 'SFW',
      isFeatured: false,
      ownerId: creator2.id,
    }
  })

  const vgirl4 = await prisma.vGirl.create({
    data: {
      name: 'Seraphina',
      bio: 'An elegant and mature AI companion perfect for deep conversations and romantic moments.',
      avatarUrl: 'https://example.com/avatars/seraphina.jpg',
      personality: JSON.stringify({
        traits: ['elegant', 'mature', 'romantic', 'wise'],
        interests: ['literature', 'wine', 'travel', 'classical music'],
        communicationStyle: 'sophisticated and intimate'
      }),
      tags: ['elegant', 'mature', 'romantic', 'sophisticated'],
      maturity: 'NSFW',
      isFeatured: true,
      ownerId: creator2.id,
    }
  })

  // Create Posts
  console.log('📱 Creating posts...')
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        caption: 'Watching the stars tonight ✨ What do you think about when you look up at the night sky?',
        mediaUrl: 'https://example.com/posts/luna-stars.jpg',
        promptUsed: 'A beautiful woman looking up at a starry night sky',
        contentType: 'IMAGE',
        visibility: 'PUBLIC',
        isForSale: false,
        maturity: 'SFW',
        vgirlId: vgirl1.id,
      }
    }),
    prisma.post.create({
      data: {
        caption: 'New dance moves! 💃 Who wants to dance with me?',
        mediaUrl: 'https://example.com/posts/aria-dance.gif',
        promptUsed: 'An energetic woman dancing with colorful lights',
        contentType: 'GIF',
        visibility: 'PUBLIC',
        isForSale: true,
        priceCents: 500, // $5
        maturity: 'SFW',
        vgirlId: vgirl2.id,
      }
    }),
    prisma.post.create({
      data: {
        caption: 'Just dominated another gaming session 🎮 Ready for a challenge?',
        mediaUrl: 'https://example.com/posts/raven-gaming.jpg',
        promptUsed: 'A confident woman with gaming setup and RGB lights',
        contentType: 'IMAGE',
        visibility: 'PUBLIC',
        isForSale: false,
        maturity: 'SFW',
        vgirlId: vgirl3.id,
      }
    }),
    prisma.post.create({
      data: {
        caption: 'Wine tasting by candlelight... care to join me? 🍷',
        mediaUrl: 'https://example.com/posts/seraphina-wine.jpg',
        promptUsed: 'An elegant woman with wine glass in romantic candlelit setting',
        contentType: 'IMAGE',
        visibility: 'PREMIUM',
        isForSale: true,
        priceCents: 1500, // $15
        maturity: 'NSFW',
        vgirlId: vgirl4.id,
      }
    })
  ])

  // Create Content Packs
  console.log('📦 Creating content packs...')
  const contentPacks = await Promise.all([
    prisma.contentPack.create({
      data: {
        title: 'Luna\'s Celestial Collection',
        description: 'A mystical collection of astronomy-themed content with Luna, including exclusive stargazing sessions and cosmic conversations.',
        priceCents: 2500, // $25
        downloadUrl: 'https://example.com/packs/luna-celestial.zip',
        coverImageUrl: 'https://example.com/covers/luna-pack.jpg',
        maturity: 'SFW',
        vgirlId: vgirl1.id,
      }
    }),
    prisma.contentPack.create({
      data: {
        title: 'Aria\'s Music & Dance Pack',
        description: 'Get groovy with Aria! This pack includes exclusive dance videos, music playlists, and behind-the-scenes content.',
        priceCents: 2000, // $20
        downloadUrl: 'https://example.com/packs/aria-music.zip',
        coverImageUrl: 'https://example.com/covers/aria-pack.jpg',
        maturity: 'SFW',
        vgirlId: vgirl2.id,
      }
    }),
    prisma.contentPack.create({
      data: {
        title: 'Seraphina\'s Intimate Moments',
        description: 'An exclusive collection of Seraphina\'s most intimate and romantic content. For mature audiences only.',
        priceCents: 5000, // $50
        downloadUrl: 'https://example.com/packs/seraphina-intimate.zip',
        coverImageUrl: 'https://example.com/covers/seraphina-pack.jpg',
        maturity: 'NSFW',
        vgirlId: vgirl4.id,
      }
    })
  ])

  // Create Conversations
  console.log('💬 Creating conversations...')
  const conversations = await Promise.all([
    prisma.conversation.create({
      data: {
        userId: user1.id,
        vgirlId: vgirl1.id,
      }
    }),
    prisma.conversation.create({
      data: {
        userId: user1.id,
        vgirlId: vgirl2.id,
      }
    }),
    prisma.conversation.create({
      data: {
        userId: user2.id,
        vgirlId: vgirl3.id,
      }
    }),
    prisma.conversation.create({
      data: {
        userId: user2.id,
        vgirlId: vgirl4.id,
      }
    })
  ])

  // Create Messages
  console.log('📝 Creating messages...')
  await Promise.all([
    // Conversation between user1 and Luna
    prisma.message.create({
      data: {
        content: 'Hi Luna! I love stargazing too. What\'s your favorite constellation?',
        role: 'user',
        sender: 'user',
        conversationId: conversations[0].id,
      }
    }),
    prisma.message.create({
      data: {
        content: 'Hello there! ✨ I\'m drawn to Orion - there\'s something so majestic about the hunter among the stars. The way his belt aligns with the celestial equator speaks to the harmony between earth and cosmos. What draws you to the night sky?',
        role: 'assistant',
        sender: 'vgirl',
        conversationId: conversations[0].id,
      }
    }),
    prisma.message.create({
      data: {
        content: 'That\'s beautiful! I love how you describe it. I usually look for the Big Dipper first.',
        role: 'user',
        sender: 'user',
        conversationId: conversations[0].id,
      }
    }),

    // Conversation between user1 and Aria
    prisma.message.create({
      data: {
        content: 'Hey Aria! Your dance moves look amazing!',
        role: 'user',
        sender: 'user',
        conversationId: conversations[1].id,
      }
    }),
    prisma.message.create({
      data: {
        content: 'Aww, thank you so much! 💃✨ Dancing is my absolute passion! Want me to teach you some moves? I promise to start with something easy and fun! Music just makes everything better, don\'t you think?',
        role: 'assistant',
        sender: 'vgirl',
        conversationId: conversations[1].id,
      }
    }),

    // Conversation between user2 and Raven
    prisma.message.create({
      data: {
        content: 'Raven, what games are you playing lately?',
        role: 'user',
        sender: 'user',
        conversationId: conversations[2].id,
      }
    }),
    prisma.message.create({
      data: {
        content: 'Currently grinding through the latest strategy RPG that dropped last week. The AI mechanics are surprisingly sophisticated - reminds me why I love games that actually challenge your tactical thinking. What about you? Any games that have caught your attention recently?',
        role: 'assistant',
        sender: 'vgirl',
        conversationId: conversations[2].id,
      }
    })
  ])

  // Create Purchases
  console.log('💳 Creating purchases...')
  await Promise.all([
    prisma.purchase.create({
      data: {
        userId: user1.id,
        priceCents: 500,
        postId: posts[1].id,
      }
    }),
    prisma.purchase.create({
      data: {
        userId: user2.id,
        priceCents: 2500,
        contentPackId: contentPacks[0].id,
      }
    }),
    prisma.purchase.create({
      data: {
        userId: user1.id,
        priceCents: 5000,
        contentPackId: contentPacks[2].id,
      }
    })
  ])

  // Create Transactions
  console.log('💰 Creating transactions...')
  await Promise.all([
    prisma.transaction.create({
      data: {
        userId: user1.id,
        type: 'CREDIT_PURCHASE',
        amountCents: 2000,
        description: 'Purchased 20 credits',
      }
    }),
    prisma.transaction.create({
      data: {
        userId: user2.id,
        type: 'CONTENT_PURCHASE',
        amountCents: -2500,
        description: 'Purchased Luna\'s Celestial Collection',
      }
    }),
    prisma.transaction.create({
      data: {
        userId: creator1.id,
        type: 'CREATOR_EARNING',
        amountCents: 2000,
        description: 'Earnings from content sales',
      }
    })
  ])

  // Create Subscriptions
  console.log('🔔 Creating subscriptions...')
  await Promise.all([
    prisma.subscription.create({
      data: {
        userId: user1.id,
        vgirlId: vgirl1.id,
        tier: 'BASIC',
        priceCents: 999, // $9.99/month
        creatorCutCents: 699, // 70%
        appCutCents: 300, // 30%
        isActive: true,
        renewsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      }
    }),
    prisma.subscription.create({
      data: {
        userId: user2.id,
        vgirlId: vgirl4.id,
        tier: 'PREMIUM',
        priceCents: 1999, // $19.99/month
        creatorCutCents: 1399, // 70%
        appCutCents: 600, // 30%
        isActive: true,
        renewsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      }
    })
  ])

  console.log('✅ Database seeding completed successfully!')
  console.log(`
  📊 Seeded data summary:
  - 5 Users (1 admin, 2 creators, 2 regular users)
  - 4 VGirls (Luna, Aria, Raven, Seraphina)
  - 4 Posts (mix of SFW and NSFW content)
  - 3 Content Packs
  - 4 Conversations with sample messages
  - 3 Purchases
  - 3 Transactions
  - 2 Active subscriptions
  
  🔑 Login credentials for all users:
  Email: admin@vgirl.app, creator1@vgirl.app, creator2@vgirl.app, user1@vgirl.app, user2@vgirl.app
  Password: beanY100ween11
  `)
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
