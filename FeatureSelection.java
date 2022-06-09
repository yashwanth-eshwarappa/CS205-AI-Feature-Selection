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
		String filePath;
		if(args.length>0) {
			filePath = args[0];
		}
		else {
			filePath = "src/main/CS205_SP_2022_SMALLtestdata__9.txt";
		}
		Scanner sc = new Scanner(new File(filePath));
		
		
		
		Map<Double, List<List<Double>>> map = new HashMap<>();
//		type.put((double) 0, new ArrayList<>());
//		type.put((double) 1, new ArrayList<>());
		
		
		while(sc.hasNext()) {
//			String[] eachLine = sc.nextLine().split("   ");
			
			Scanner scEachLine = new Scanner(sc.nextLine());
			
			Double type = scEachLine.nextDouble();
//			map.put(type, new ArrayList<>());
			List<Double> features = new ArrayList<>();
			
			while(scEachLine.hasNext()){
				features.add(scEachLine.nextDouble());
			}
			
			if(!map.containsKey(type)) {
				map.put(type, new ArrayList<>());
				
			}
			map.get(type).add(features);
			
//			System.out.println(eachLine[1]);
//			List<Double> features = new ArrayList<>();
//			type.put((Double.parseDouble(eachLine[1])), new ArrayList<>());
//			for(int i=2;i<eachLine.length;i++) {
//				System.out.println(eachLine[i]);
////				type.get(Double.parseDouble(eachLine[1])).add(Double.parseDouble(eachLine[i]));
//			}
////			type.get(eachLine[0]).(features);
			
//			System.out.println(eachLine[1]);
//			break;
		}
		
		for(Map.Entry<Double, List<List<Double>>> each: map.entrySet()) {
			System.out.println(each.getValue());
		}
	}
}
