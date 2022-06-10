package main;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;

class FeatureSelection {
	public static void main (String args[]) throws FileNotFoundException {
		String filePath = "src/main/CS205_SP_2022_SMALLtestdata__9.txt";;
		
		if(args.length>0) {
			filePath = args[0];
		}
//		else {
//			filePath = "src/main/CS205_SP_2022_SMALLtestdata__9.txt";
//		}
		
		Scanner sc = new Scanner(new File(filePath));
		List<List<Double>> dataList = new ArrayList<>();
		
		
		while(sc.hasNext()) {
			
			Scanner scEachLine = new Scanner(sc.nextLine());
//			Double type = scEachLine.nextDouble();
			
			List<Double> features = new ArrayList<>();
			
			while(scEachLine.hasNext()){
				features.add(scEachLine.nextDouble());
			}
			
			dataList.add(features);
//			if(!map.containsKey(type)) {
//				map.put(type, new ArrayList<>());
//				
//			}
//			map.get(type).add(features);
		}
		
//		Iterator<Double> it = dataList.iterator();
		
		System.out.println(dataList.get(0));
		
//		while(it.hasNext()) {
//			System.out.println(it.get());
//		}
		
//		//checking data
//		for(Map.Entry<Double, List<List<Double>>> each: map.entrySet()) {
//			System.out.println("Key:" + each.getKey() + ", value:" + each.getValue());
//		}
		
		
		forwardSelection(dataList);
	}
}
