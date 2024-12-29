import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const createUser = (username: string, email: string, password: string) => ({
    username,
    email,
    password,
  });

  const createCommunity = (name: string) => ({
    name,
  });

  const createPost = (
    title: string,
    content: string,
    userId: number,
    communityId: number
  ) => ({
    title,
    content,
    userId,
    communityId,
  });

  await prisma.user.createMany({
    data: [
      createUser("Rachelle", "rachelle@gmail.com", "password123"),
      createUser("Aaron", "aaron@gmail.com", "password456"),
      createUser("Marcel", "marcel@gmail.com", "password789"),
      createUser("Joey", "joey@gmail.com", "password012"),
      createUser("Dave", "dave@gmail.com", "password345"),
    ],
  });

  await prisma.community.createMany({
    data: [
      createCommunity("Tech"),
      createCommunity("Music"),
      createCommunity("Food"),
      createCommunity("Travel"),
      createCommunity("Fitness"),
    ],
  });

  await prisma.post.createMany({
    data: [
      createPost("Tech post", "Tech content", 1, 1),
      createPost("Music post", "Music content", 2, 2),
      createPost("Food post", "Food content", 3, 3),
      createPost("Travel post", "Travel content", 4, 4),
      createPost("Fitness post", "Fitness content", 5, 5),
    ],
  });

  console.log("Seeded data successfully.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
