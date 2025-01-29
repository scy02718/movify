// This file will be used to setup the appwrite SDK

import { Client, Databases, ID, Query } from "appwrite";

// This will be helper function to update the appwrite DB
// First import all the required ID variables from .env.local
const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

// Then, create a new appwrite client, which will direct to the project itself
const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(PROJECT_ID)

// Then, create a new database instance that is connected to the client
const database = new Databases(client);

// This will be an async function to interact with the database
// 이거 되게 확장 가능성 있겠는데? 이런 식으로 BaaS 사용해서 데이터베이스 자체를 지금처럼 searchTerm 만 저장하는게 아니라
// 다른 데이터들도 저장하면 훨씬 full stack 같은 복잡한, non-static website 만들 수 있겠다 -> eg Recommendation system 이나, User authentication, 혹은 discussion forum!
// 오 discussion forum 괜찮은데? User authentication 을 next auth 쓰지 말고 이런 식으로 만들어보자. 
// 그리고 discussion forum 넣어서 영화에 대한 리뷰나, 추천을 할 수 있게 만들어보자.
// 그리고 영화 자체를 클릭하면 그 영화에 대한 정보를 보여주는 페이지를 만들어보자.
// 그리고 그 페이지 안에서 한번 더 fetch 를 해서, 그 특정 영화에 관련된 리뷰와 별점을 남길 수 있도록
// 따로 discussion 페이지에서는 사람들이 전반적으로 영화에 대한 리뷰를 남길 수 있도록

// This function itself is to update the "search count" attribute of the specific database and collection
export const updateSearchCount = async (searchTerm, movie) => {
    // 1. Use appwrite SDK to check if a document / searchTerm exists in the DB
    // 2. If it does, increment the count by 1
    // 3. If no document is found, create a new document with the searchTerm and count of 1
    try {
        // First list all the documents, that satisfy the query
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', searchTerm)
        ]);

        // If the length of the result is greater than 0, meaning that the document exists
        // Update the document by incrementing the count by 1
        if (result.documents.length > 0) {
            const doc = result.documents[0];

            await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
                count: doc.count + 1
            });
        } else {
            // If the document does not exist, grab the information and create a new document
            // ID.unique() will create a unique ID for the document
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm,
                count: 1,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                movie_id: movie.id
            });
        }

    } catch (error) {
        console.error(error);
    }
}