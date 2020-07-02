package com.clazzbuddy.restmodel;

import java.util.List;

import com.clazzbuddy.mongocollections.PostalAddress;

public class PostalAddressSearchResult extends CommonResult {

	private List<PostalAddress> postalAddresses;

	public List<PostalAddress> getPostalAddresses() {
		return postalAddresses;
	}

	public void setPostalAddresses(List<PostalAddress> postalAddresses) {
		this.postalAddresses = postalAddresses;
	}

}
