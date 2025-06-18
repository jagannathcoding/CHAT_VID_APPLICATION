import React, { useEffect, useState } from 'react'
import { useThemeStore } from '../store/useThemeStore'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getOutgoingFriendReqs, getRecommendedUsers, getUserFriends, sendFriendRequest } from '../lib/api'
const HomePage = () => {

  const QueryClient = useQueryClient();
  const [outgoingRequestIds, setOutgoingRequestIds] = useState(new Set())

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  })


  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  })

  const { data: outgoingFriendReqs } = useQuery({
    queryKey: ["outgoingFriendReqs"],
    queryFn: getOutgoingFriendReqs,
  });

  const {mutate:sendRequestMutation,isPending}=useMutation({
    mutationFn:sendFriendRequest,
    onSuccess:()=>QueryClient.invalidateQueries({queryKey:["outgoingFriendReqs"]})
  })

  useEffect(()=>{
    const outgoingIds=new Set()
    if(outgoingFriendReqs&&outgoingFriendReqs.length>0){
      outgoingFriendReqs.forEach((req)=>{
        outgoingIds.add(req.id)
      })
    }
  },[outgoingFriendReqs])

  return (
    <div>
      Home Page
    </div>
  )
}

export default HomePage
